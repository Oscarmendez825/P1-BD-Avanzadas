var express = require('express');
var router = express.Router();
const graphDBConnect = require('../middleware/graphDBConnect');
const fs = require('fs');
const multer = require('multer'); // Para manejar la carga de archivos

function formatResponse(resultObj) {
  const result = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map(record => {
      result.push(record._fields[0].properties);
    });
  }
  return result;
}
// Configura multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.csvFile);
  }
});
const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', async function(req, res) {
  const query = 'MATCH (p: Publicacion) RETURN p';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
/** Busqueda de publicaciones a partir de su titulo, devuelve informacion de estas y el nombre de los proyectos asociados */
router.get('/title/:id', async function(req, res) {
  const { id } = req.params;
  const query = `
  MATCH (pb:Publicacion {titulo_publicacion: $id})-[:REALIZADA_EN]->(p:Proyecto)
  RETURN pb.idPub, pb.anno_publicacion, pb.nombre_revista, p.titulo_proyecto;`;
  const params = {id};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = [];
  if (resultObj.records.length > 0) {
      resultObj.records.map(record => {
      result.push(record._fields);
      });
  }
  res.send(result);
});
/** PUT by id */
router.put('/:id', async function(req, res){
    const { titulo, anno, nombre } = req.body;
    const { id } = req.params;
    console.log('body', req.body);
    console.log('params', req.params);
    const query = `MATCH (p:Publicacion {idPub: $id})
        SET p.titulo_publicacion = $titulo,
        p.anno_publicacion = $anno,
        p.nombre_revista = $nombre;`;
    const params = { id, titulo, anno: Number(anno), nombre };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
})
/** Cargar CSV */
router.post('/csv', upload.single('csvFile'), async function(req, res){
  const csvFilePath = `uploads/${req.file.filename}`; // Ruta local del archivo CSV
  console.log('body', csvFilePath);
  const query = `
  LOAD CSV WITH HEADERS FROM 'file:///${csvFilePath}' AS row
  CREATE (:Publicacion {
    idPub: toInteger(row.idPub),
    titulo_publicacion: row.titulo_publicacion,
    anno_publicacion: toInteger(row.anno_publicacion),
    nombre_revista: row.nombre_revista
    	});`;
    try {
      const resultObj = await graphDBConnect.executeCypherQuery(query);
      res.send(resultObj.records);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la consulta");
  }
});

/** Cargar CSV asociados a proyectos */
router.post('/csvPry', upload.single('csvFile'), async function(req, res){
  const csvFilePath = `/uploads/${req.file.filename}`;  
  console.log('body', csvFilePath);
  const query = `
    LOAD CSV WITH HEADERS FROM 'file:///${csvFilePath}' AS row
    MATCH (proyecto:Proyecto {idPry: toInteger(row.idProyecto)})
    MATCH (publicacion:Publicacion {idPub: toInteger(row.idArt)})
    CREATE (publicacion)-[:REALIZADA_EN]->(proyecto);`;
    try {
      const resultObj = await graphDBConnect.executeCypherQuery(query);
      res.send(resultObj.records);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la consulta");
  }
});
/** Crear una nueva publicacion */
router.post('/', async function(req, res){
  const { nombre, titulo, ins, email } = req.body;
  console.log('body', req.body);
  const query = `
  MATCH (p:Publicacion)
  WITH COALESCE(MAX(p.idPub), 0) AS max_id
  CREATE (nuevaPublicacion:Publicacion {
    idPub: max_id + 1,
    titulo_publicacion: 'Nuevo Título',
    anno_publicacion: 2023,
    nombre_revista: 'Nombre de la Revista'
  })
  RETURN nuevaPublicacion;`;
  const params = { nombre, titulo, ins, email };
  try {
      const resultObj = await graphDBConnect.executeCypherQuery(query, params);
      res.send(resultObj.records);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la consulta");
  }
});
/** Asociar un articulo a un proyecto por ID */
router.post('/asociar/Inv/Pro', async function(req, res){
  const { id, idPry } = req.body;
  console.log('body', req.body);
  const query = `
  MATCH (pb:Publicacion), (p:Proyecto)
  WHERE id(i) = $id AND id(p) = $idPry
  CREATE (pb)-[:REALIZADA_EN]->(p);`;
  const params = { id: parseInt(id), idPry: parseInt(idPry) };
  try {
      const resultObj = await graphDBConnect.executeCypherQuery(query, params);
      res.send(resultObj.records);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la consulta");
  }
});
/** Asociar por nombre de articulo y titulo de proyecto
 */
router.post('/asociar/name', async function(req, res){
  const { id, idPry } = req.body;
  console.log('body', req.body);
  const query = `
  MATCH (pb:Publicacion), (p:Proyecto)
  WHERE pb.titulo_publicacion = $id AND p.titulo_proyecto = $idPry
  CREATE (pb)-[:REALIZADA_EN]-> (p);`;
  const params = { id, idPry };
  try {
      const resultObj = await graphDBConnect.executeCypherQuery(query, params);
      res.send(resultObj.records);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en la consulta");
  }
});
module.exports = router;