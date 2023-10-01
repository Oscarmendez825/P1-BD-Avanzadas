var express = require('express');
var router = express.Router();
const graphDBConnect = require('../middleware/graphDBConnect');

function formatResponse(resultObj) {
  const result = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map(record => {
      result.push(record._fields[0].properties);
    });
  }
  return result;
}
/* GET all projects. */
router.get('/', async function(req, res) {
  const query = 'MATCH (p:Proyecto) RETURN p';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});

/** PUT by id */
router.put('/:id', async function(req, res) {
    const { titulo, anno, meses, area } = req.body;
    const { id } = req.params;
    console.log('body', req.body);
    const query = `
      MATCH (p:Proyecto {idPry: $id})
      SET p.titulo_proyecto = $titulo,
          p.anno_inicio = $anno,
          p.duracion_meses = $meses,
          p.area_conocimiento = $area
      RETURN p;`;
    const params = { id, titulo, anno: Number(anno), meses: Number(meses), area };
    try {
        const resultObj = await graphDBConnect.executeCypherQuery(query, params);
        res.send(resultObj.records);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la consulta");
    }
});

module.exports = router;