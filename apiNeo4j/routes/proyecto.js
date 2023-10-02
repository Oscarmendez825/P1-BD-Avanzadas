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

/* GET all projects. */
router.get('/', async function(req, res) {
  const query = 'MATCH (p:Proyecto) RETURN p;';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
/** Top 5 */
router.get('/top5', async function(req, res) {
    const query = `MATCH (p:Proyecto)
    WITH p.area_conocimiento AS area_conocimiento, COUNT(p) AS cantidadProyectos
    RETURN area_conocimiento AS nombre, cantidadProyectos AS cantidad
    ORDER BY cantidadProyectos DESC
    LIMIT 5;`;
    const resultObj = await graphDBConnect.executeCypherQuery(query);
    const result = [];
    
    if (resultObj.records.length > 0) {
        resultObj.records.forEach(record => {
            result.push({
                nombre: record.get('nombre'),
                cantidad: record.get('cantidad')// Obtener el valor numérico
            });
        });
    }
    
    res.send(result);
});

/** Get only name  */
router.get('/names', async function(req, res) {
    	const query = 'MATCH (p:Proyecto) RETURN p.titulo_proyecto;';
    const resultObj = await graphDBConnect.executeCypherQuery(query);
    const result = [];
    if (resultObj.records.length > 0) {
        resultObj.records.map(record => {
        result.push(record._fields[0]);
        });
    }
    res.send(result);
});

/** Get only areas de conocimiento  */
router.get('/areas', async function(req, res) {
    const query = 'MATCH (p:Proyecto) RETURN p.area_conocimiento;';
    const resultObj = await graphDBConnect.executeCypherQuery(query);
    const result = [];
  
    if (resultObj.records.length > 0) {
      resultObj.records.forEach(record => {
        const nombre = record.get('p.area_conocimiento');
        result.push({ nombre });
      });
    }
  
    res.send(result);
  });

/** Get only areas de conocimiento  */
router.get('/areas/:nombre', async function(req, res) {
    const nombre = req.params.nombre;
    const query = `
        MATCH (p:Proyecto {area_conocimiento: $nombre})
        RETURN [(pb:Publicacion)-[:REALIZADA_EN]->(p) | {titulo_proyecto: p.titulo_proyecto, titulo_publicacion: pb.titulo_publicacion}] AS resultado;
    `;
    const params = { nombre };
    
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);

        if (resultObj.records.length > 0) {
            const resultado = resultObj.records[0].get('resultado');
            res.send(resultado);
        } else {
            res.send([]); // Devuelve un arreglo vacío si no hay resultados
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al ejecutar la consulta' });
    }
});


/**Busqueda de proyectos a partir de su nombre, devuelve info del proyecto, de los investigadores y de las publicaciones asociadas */
router.get('/busqueda/:id', async function(req, res) {
    const idPry = parseInt(req.params.id);
    const query = `MATCH (p:Proyecto {idPry:$idPry})
    RETURN
        [(i:Investigador)-[:TRABAJA_EN]->(p) | {nombre_completo: i.nombre_completo, titulo_academico: i.titulo_academico, institucion: i.institucion, email: i.email}] AS investigadores,
        [(pb:Publicacion)-[:REALIZADA_EN]->(p) | {titulo_publicacion: pb.titulo_publicacion, anno_publicacion: pb.anno_publicacion, nombre_revista: pb.nombre_revista}] AS publicaciones;`;
    const params = {idPry};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    
    if (resultObj.records.length > 0) {
        const investigadores = resultObj.records[0].get('investigadores');
        const publicaciones = resultObj.records[0].get('publicaciones');
        const result = [investigadores, publicaciones];
        res.send(result);
    } else {
        res.send([[], []]); // Devuelve dos arreglos vacíos si no hay resultados
    }
});


/**Busqueda de area de conocimiento por nombre del area, devuelve el nombre del area de conocimiento, los nombres de los proyectos asociados y de las publicaciones del area */
router.get('/area/:id', async function(req, res) {
    const { id } = req.params;
    const query = `
    MATCH (p:Proyecto {area_conocimiento: $id})<-[:REALIZADA_EN]-(pb:Publicacion)
    RETURN DISTINCT p.area_conocimiento AS area_conocimiento,
       COLLECT(DISTINCT p.titulo_proyecto) AS proyectos,
       COLLECT(DISTINCT pb.titulo_publicacion) AS publicaciones;`;
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
router.put('/:id', async function(req, res) {
    const { titulo_proyecto, anno_inicio, duracion_meses, area_conocimiento} = req.body;
    const id = parseInt(req.params.id);
    console.log('body', req.body);
    const query = `
      MATCH (p:Proyecto {idPry: $id})
      SET p.titulo_proyecto = $titulo_proyecto,
          p.anno_inicio = $anno_inicio,
          p.duracion_meses = $duracion_meses,
          p.area_conocimiento = $area_conocimiento;`;
    const params = { id, titulo_proyecto, anno_inicio, duracion_meses, area_conocimiento };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});

/** Cargar CSV */
router.post('/csv', upload.single('csvFile'), async function(req, res){
    const csvFilePath = `uploads/${req.file.filename}`; // Ruta local del archivo CSV
    console.log('body', csvFilePath);
    const query = `
        LOAD CSV WITH HEADERS FROM 'file:///${csvFilePath}' AS row
        CREATE (:Proyecto {
        idPry: toInteger(row.idPry),
        titulo_proyecto: row.titulo_proyecto,
        anno_inicio: toInteger(row.anno_inicio),
        duracion_meses: toInteger(row.duracion_meses),
        area_conocimiento: row.area_conocimiento
        });`;
      try {
        const resultObj = await graphDBConnect.executeCypherQuery(query);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});

/** post */
router.post('/', async function(req, res){
    const { titulo_proyecto, anno_inicio, duracion_meses, area_conocimiento} = req.body;
    console.log('params', req.params);
    console.log('body', req.body);
    const query = `
    MATCH (p:Proyecto)
    WITH COALESCE(MAX(p.idPry), 0) AS max_id
    CREATE (nuevoProyecto:Proyecto {
        idPry: max_id + 1,
        titulo_proyecto: $titulo_proyecto,
        anno_inicio: $anno_inicio,  
        duracion_meses: $duracion_meses, 
        area_conocimiento: $area_conocimiento
        })
    RETURN nuevoProyecto;`;
    const params = { anno_inicio, titulo_proyecto, duracion_meses, area_conocimiento };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});

module.exports = router;