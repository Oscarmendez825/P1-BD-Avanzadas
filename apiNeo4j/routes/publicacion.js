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
/* GET users listing. */
router.get('/', async function(req, res) {
  const query = 'MATCH (p) RETURN p';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  console.log('result',resultObj)
  const result = formatResponse(resultObj);
  res.send(result);
});

/** PUT by id */
router.put('/:id', async function(req, res){
    const { titulo, anno, nombre } = req.body;
    const { id } = req.params.id;
    console.log('body', req.body)
    const query = `MATCH (p:Publicacion {idPub: ${id}})
        SET p.titulo_publicacion = '${titulo}',
        p.anno_publicacion = ${Number(anno)},
        p.nombre_revista = '${nombre}';`
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatResponse(resultObj);
    res.send(result);
})

module.exports = router;