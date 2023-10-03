var express = require('express');
var router = express.Router();
const graphDBConnect = require('../middleware/graphDBConnect');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fs = require('fs');
const csv = require('csv-parser');
const session = graphDBConnect.driver.session();

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
  try {
    const archivos = req.files;
    console.log(archivos);

    // Itera sobre los archivos y guárdalos en la carpeta "uploads"
    for (const archivo of archivos) {
      const nombreArchivo = archivo.originalname;
      const rutaArchivo = `../uploads/${nombreArchivo}`;

      try {
        const session = graphDBConnect.driver.session();
        const transaction = session.beginTransaction();

        if (nombreArchivo === 'Investigadores.csv') {
          fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (row) => {
              createInvestigator(row, transaction);
            })
            .on('end', async () => {
              // Commit and close the transaction when CSV processing is done
              await transaction.commit();
              transaction.close();
              session.close(); // Cierra la sesión
              console.log('Proceso completado.');
            });
        } else if (nombreArchivo === 'Proyectos.csv') {
          fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (row) => {
              createProject(row, transaction);
            })
            .on('end', async () => {
              // Commit and close the transaction when CSV processing is done
              await transaction.commit();
              transaction.close();
              session.close(); // Cierra la sesión
              console.log('Proceso completado.');
            });
        } else if (nombreArchivo === 'Publicaciones.csv') {
          fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (row) => {
              createPublicaciones(row, transaction);
            })
            .on('end', async () => {
              // Commit and close the transaction when CSV processing is done
              await transaction.commit();
              transaction.close();
              session.close(); // Cierra la sesión
              console.log('Proceso completado.');
            });
        }
        else if (nombreArchivo === 'PublicacionesProy.csv') {
          fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (row) => {
              asociarPublicaciones(row, transaction);
            })
            .on('end', async () => {
              // Commit and close the transaction when CSV processing is done
              await transaction.commit();
              transaction.close();
              session.close(); // Cierra la sesión
              console.log('Proceso completado.');
            });
        }
        else if (nombreArchivo === 'InvestigadoresProy.csv') {
          fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (row) => {
              asociarInvestigadores(row, transaction);
            })
            .on('end', async () => {
              // Commit and close the transaction when CSV processing is done
              await transaction.commit();
              transaction.close();
              session.close(); // Cierra la sesión
              console.log('Proceso completado.');
            });
        }
        else {
          console.log("Bad File Name");
          // Close the transaction and session for invalid files
          transaction.close();
          session.close();
        }

        // Guarda el archivo en el sistema de archivos
        fs.writeFileSync(rutaArchivo, archivo.buffer);
      } catch (error) {
        console.error('Error al procesar el archivo CSV:', error);
        res.status(500).json({ error: 'Error al subir archivos' });
      }
    }

    res.status(200).json({ message: 'Archivos subidos con éxito' });
  } catch (error) {
    console.error('Error al subir archivos:', error);
    res.status(500).json({ error: 'Error al subir archivos' });
  }
});


// Función para crear un investigador en Neo4j
// Función para crear un investigador en Neo4j
async function createInvestigator(investigatorData, transaction) {
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
    const result = await transaction.run(query, params);
    console.log(`Nodo creado: ${result.records[0].get('nuevoInvestigador').properties.nombre_completo}`);
  } catch (error) {
    console.error('Error al crear el nodo:', error);
    throw error;
  }
}

async function createProject(projectData, transaction) {
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
  RETURN nuevoProyecto;
  `;

  const params = {
    titulo_proyecto: projectData.titulo_proyecto,
    anno_inicio: projectData.anno_inicio,
    duracion_meses: projectData.duracion_meses,
    area_conocimiento: projectData.area_conocimiento,
  };

  try {
    const result = await transaction.run(query, params);
    console.log(`Nodo creado: ${result.records[0].get('nuevoProyecto').properties.titulo_proyecto}`);
  } catch (error) {
    console.error('Error al crear el nodo:', error);
    throw error;
  }
}

async function createPublicaciones(pubData, transaction) {
  const query = `
  MATCH (p:Publicacion)
  WITH COALESCE(MAX(p.idPub), 0) AS max_id
  CREATE (nuevaPublicacion:Publicacion {
  idPub: max_id + 1,
  titulo_publicacion: $titulo_publicacion,
  anno_publicacion: $anno_publicacion,
  nombre_revista: $nombre_revista
  })
  RETURN nuevaPublicacion;`;

  const params = {
    titulo_publicacion: pubData.titulo_publicacion,
    anno_publicacion: pubData.anno_publicacion,
    nombre_revista: pubData.nombre_revista,
  };

  try {
    const result = await transaction.run(query, params);
    console.log(`Nodo creado: ${result.records[0].get('nuevaPublicacion').properties.titulo_publicacion}`);
  } catch (error) {
    console.error('Error al crear el nodo:', error);
    throw error;
  }
}

async function asociarPublicaciones(asocData, transaction) {
  const query = `
  MATCH (pb:Publicacion), (p:Proyecto)
  WHERE pb.idPub = $idPub AND p.idPry = $idPry
  CREATE (pb)-[:REALIZADA_EN]->(p);`;
  const idPub = Number(asocData.idArt);
  const idPry = Number(asocData.idProyecto);
  const params = {idPub, idPry};

  try {
    const result = await transaction.run(query, params);
  } catch (error) {
    console.error('Error al crear el nodo:', error);
    throw error;
  }
}


async function asociarInvestigadores(asocData, transaction) {
  const query = `MATCH (i:Investigador), (p:Proyecto)
  WHERE i.id = $id AND p.idPry = $idPry
  CREATE (i)-[:TRABAJA_EN]->(p);`;
  const id = Number(asocData.idInv);
  const idPry = Number(asocData.idProy);
  const params = {id, idPry};
  
  try {
    const result = await transaction.run(query, params);
  } catch (error) {
    console.error('Error al crear el nodo:', error);
    throw error;
  }
}


// Leer el archivo CSV y crear nodos

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/all', async function (req, res) {
  const query = 'MATCH (x) RETURN x';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result', resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
router.get('/investigador', async function (req, res) {
  const query = 'MATCH (i:Investigador) RETURN i;';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result', resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
router.get('/proyecto', async function (req, res) {
  const query = 'MATCH (p:Proyecto) RETURN p';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result', resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});
module.exports = router;
