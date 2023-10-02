var express = require('express');
var router = express.Router();
const graphDBConnect = require('../middleware/graphDBConnect');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fs = require('fs');
const csv = require('csv-parser');


function formatResponse(resultObj) {
  const result = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map(record => {
      result.push(record._fields[0].properties);
    });
  }
  return result;
}

router.post('/subircsv', upload.array('archivos'), async function (req, res) {
  const session = graphDBConnect.driver.session();
  try {
    const archivos = req.files;
    console.log(archivos);
    // Verifica si se recibieron archivos
    if (!archivos || archivos.length === 0) {
      return res.status(400).json({ error: 'No se recibieron archivos' });
    }

    // Itera sobre los archivos y guárdalos en la carpeta "uploads"
    archivos.forEach((archivo) => {
      const nombreArchivo = archivo.originalname;
      const rutaArchivo = `../uploads/${nombreArchivo}`;
      if(nombreArchivo == 'Investigadores.csv'){
        fs.createReadStream(rutaArchivo)
        .pipe(csv())
        .on('data', (row) => {
          createInvestigator(row, session);
        })
        .on('end', () => {
          // Cierra la sesión de Neo4j cuando se haya terminado de procesar el CSV
          session.close();
          graphDBConnect.driver.close();
          console.log('Proceso completado.');
        });
      }
      else if(nombreArchivo == 'Proyectos.csv'){

      }
      else if(nombreArchivo == 'Publicaciones.csv'){

      }
      else if(nombreArchivo == 'PublicacionesProy.csv'){

      }
      else if(nombreArchivo == 'InvestigadoresProy.csv'){

      }
      else{
        console.loc("Bad File Name")
      }

      // Guarda el archivo en el sistema de archivos
      fs.writeFileSync(rutaArchivo, archivo.buffer);
    });

    // Responde con éxito
    res.status(200).json({ message: 'Archivos subidos con éxito' });
  } catch (error) {
    console.error('Error al subir archivos:', error);
    res.status(500).json({ error: 'Error al subir archivos' });
  }
});


// Función para crear un investigador en Neo4j
// Función para crear un investigador en Neo4j
async function createInvestigator(investigatorData, session) {
  

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
    RETURN nuevoInvestigador
  `;

  const params = {
    nombre_completo: investigatorData.nombre_completo,
    titulo_academico: investigatorData.titulo_academico,
    institucion: investigatorData.institucion,
    email: investigatorData.email,
  };

  try {
    const result = await graphDBConnect.executeCypherQuery(query, params);
    console.log(`Nodo creado: ${result.records[0].get('nuevoInvestigador').properties.nombre_completo}`);
  } catch (error) {
    console.error('Error al crear el nodo:', error);
  } finally {
     // Asegúrate de cerrar la sesión después de usarla
     session.close();
  }
}


// Leer el archivo CSV y crear nodos

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/all', async function(req, res) {
  const query = 'MATCH (x) RETURN x';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
router.get('/investigador', async function(req, res) {
  const query = 'MATCH (i:Investigador) RETURN i;';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
router.get('/proyecto', async function(req, res) {
  const query = 'MATCH (p:Proyecto) RETURN p';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
module.exports = router;
