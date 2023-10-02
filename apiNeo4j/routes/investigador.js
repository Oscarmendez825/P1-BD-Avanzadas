var express = require('express');
var router = express.Router();
const graphDBConnect = require('../middleware/graphDBConnect');
const fs = require('fs');
const multer = require('multer'); // Para manejar la carga de archivos

/** Format a response in case of get */
function formatResponse(resultObj) {
  const result = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map(record => {
      result.push(record._fields[0].properties);
    });
  }
  return result;
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', async function(req, res) {
  const query = 'MATCH (i:Investigador) RETURN DISTINCT i;';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.send(result);
});

/** Get info by name and projects  */
router.get('/names/:id', async function(req, res) {
    const { id } = req.params;
    const query = `
    MATCH (i:Investigador {nombre_completo: $id})-[:TRABAJA_EN]->(p:Proyecto)
    WITH i, COLLECT({idProy: p.idPry, tituloProyecto: p.titulo_proyecto, annoInicio: p.anno_inicio, duracionMeses: p.duracion_meses, areaConocimiento: p.area_conocimiento}) AS proyectos
    RETURN i.id, i.titulo_academico, i.institucion, i.email, proyectos;`;
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

/** Get only name  */
router.get('/names', async function(req, res) {
    const query = 'MATCH (i:Investigador) RETURN i.nombre_completo;';
    const resultObj = await graphDBConnect.executeCypherQuery(query);
    const result = [];
    if (resultObj.records.length > 0) {
        resultObj.records.map(record => {
        result.push(record._fields[0]);
        });
    }
    res.send(result);
  });
 /** Top 5  */ 
 router.get('/top5', async function(req, res) {
    const query = `MATCH (i:Investigador)-[:TRABAJA_EN]->(p:Proyecto)
        WITH i.institucion AS institucion, COUNT(p) AS cantidad
        RETURN institucion AS nombre, cantidad
        ORDER BY cantidad DESC
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

 /** Top 5  */ 
 router.get('/top5Inv', async function(req, res) {
    const query = `MATCH (i:Investigador)-[:TRABAJA_EN]->(p:Proyecto)
        WITH i, i.institucion AS institucion, COUNT(p) AS cantidad
        RETURN i.nombre_completo AS nombre, institucion, cantidad
        ORDER BY cantidad DESC
        LIMIT 5;`;
    const resultObj = await graphDBConnect.executeCypherQuery(query);
    const result = [];
    if (resultObj.records.length > 0) {
        resultObj.records.forEach(record => {
            result.push({
                nombre: record.get('nombre'),
                institucion: record.get('institucion'),
                cantidad: record.get('cantidad')// Obtener el valor numérico
            });
        });
    }
    res.send(result);
});

/** Busqueda de colegas de un investigador a partir de su nombre, devuelve la informacion del investigador y el nombre de los investigadores con los que ha trabajado en otros proyectos. */
router.get('/colegas/:id', async function(req, res) {
    const { id } = req.params;
    const query = `
    MATCH (i:Investigador {nombre_completo: $id})-[:TRABAJA_EN]->(p:Proyecto)<-[:TRABAJA_EN]-(i2:Investigador)
    RETURN  i.id, i.titulo_academico, i.institucion, i.email, COLLECT(DISTINCT i2.nombre_completo) AS nombresColegas;`;
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

router.get('/busqueda/:id', async function(req, res) {
    const id = parseInt(req.params.id);
    const query = `
        MATCH (i:Investigador {id: $id})-[:TRABAJA_EN]->(p:Proyecto)
        RETURN COLLECT({
            idPry: p.idPry,
            titulo_proyecto: p.titulo_proyecto,
            anno_inicio: p.anno_inicio,
            duracion_meses: p.duracion_meses,
            area_conocimiento: p.area_conocimiento
        }) AS proyectos;
    `;
    const params = {id};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);

    // Verifica que hay resultados antes de procesarlos
    if (resultObj.records.length > 0) {
        // Obtén la lista de proyectos del primer registro (debería haber solo un registro)
        const proyectos = resultObj.records[0].get('proyectos');
        res.send(proyectos);
    } else {
        res.send([]); // Devuelve un array vacío si no hay resultados
    }
});


/** PUT by id */
router.put('/:id', async function(req, res){
    const id = parseInt(req.params.id);
    const { nombre_completo, titulo_academico, institucion, email} = req.body;
    console.log('params', req.params);
    console.log('body', req.body)

    const query = `MATCH (i:Investigador {id: $id}) SET i.nombre_completo = $nombre_completo,
             i.titulo_academico = $titulo_academico, 
             i.institucion = $institucion, 
             i.email = $email;`;
    const params = {id, nombre_completo, titulo_academico, institucion, email };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        if(resultObj.records.length > 0) res.send(resultObj.records[0].get(0).properties)
        else res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});
/** PUT by name */
router.put('/name/:id', async function(req, res){
    const { id } = req.params;
    const { titulo_academico, institucion,email} = req.body;
    console.log('params', req.params);
    console.log('body', req.body);
    const query = "MATCH (i:Investigador {nombre_completo: $id}) SET i.titulo_academico = $titulo_academico, i.institucion = $institucion, i.email = $email RETURN i;";
    const params = { id, titulo_academico, institucion, email };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});

/** post */
router.post('/', async function(req, res){
    const { nombre_completo, titulo_academico, institucion, email} = req.body;
    console.log('params', req.params);
    console.log('body', req.body);
    const query = `
    MATCH (i:Investigador)
    WITH COALESCE(MAX(i.id), 0) AS max_id
    CREATE (nuevoInvestigador:Investigador {
        id: max_id + 1,
        nombre_completo: $nombre_completo,
        titulo_academico: $titulo_academico,
        institucion: $institucion,
        email: $email
    })
    RETURN nuevoInvestigador;`;
    const params = { nombre_completo, titulo_academico, institucion, email };
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
      CREATE (:Investigador {
        id: toInteger(row.id),
        nombre_completo: row.nombre_completo,
        titulo_academico: row.titulo_academico,
        institucion: row.institucion,
        email: row.email
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
    if (!req.file || !req.file.path) {
        return res.status(400).send("No se proporcionó un archivo válido.");
      }
    const csvFilePath = `/uploads/${req.file.filename}`;  
    console.log('body', csvFilePath);
    const query = `
        LOAD CSV WITH HEADERS FROM 'file://${csvFilePath}' AS row
        MATCH (investigador:Investigador {id: toInteger(row.idInv)})
        MATCH (proyecto:Proyecto {idPry: toInteger(row.idProy)})
        CREATE (investigador)-[:TRABAJA_EN]->(proyecto);`;
      try {
        const resultObj = await graphDBConnect.executeCypherQuery(query);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});

/** Asociar un investigador por Id por un proyecto */
router.post('/asociar/Inv/Pro', async function(req, res){
    const { investigador, proyecto } = req.body;
    console.log('body', req.body);
    const query = `
    MATCH (i:Investigador), (p:Proyecto)
    WHERE id(i) = $investigador AND id(p) = $proyecto
    CREATE (i)-[:TRABAJA_EN]->(p);`;
    const params = { investigador: parseInt(investigador), proyecto: parseInt(proyecto) };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});
/** Asociar investigador a proyecto por nombres */
router.post('/asociar/name', async function(req, res){
    const { investigador, proyecto } = req.body;
    console.log('body', req.body);
    const query = `
    MATCH (i:Investigador), (p:Proyecto)
    WHERE i.nombre_completo = $investigador AND p.titulo_proyecto = $proyecto
    CREATE (i)-[:TRABAJA_EN]->(p)`;
    const params = { investigador, proyecto };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});
/** Asociar investigador a proyecto por ID */
router.post('/asociar', async function(req, res){
    const {id, titulo_proyecto} = req.body;
    console.log('body', req.body);
    const query = `MATCH (i:Investigador), (p:Proyecto)
    WHERE i.id = $id AND p.titulo_proyecto = $titulo_proyecto
    CREATE (i)-[:TRABAJA_EN]->(p);`;
    const params = { id, titulo_proyecto };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});
/** Delete */
router.delete('/', async (req, res) => {
    const query = `MATCH (i:Investigador) DELETE i;`;
    const params = {};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatResponse(resultObj);
    res.send(result);
});
module.exports = router;