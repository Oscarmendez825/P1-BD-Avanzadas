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
  const query = 'MATCH (i:Investigador) RETURN DISTINCT i;';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.send(result);
});

/** PUT by id */
router.put('/:id', async function(req, res){
    const { id } = req.params.id;
    const {titulo, ins, email} = req.body;
    console.log('params', req.params);
    console.log('body', req.body)
    const query = `MATCH (i:Investigador {id: $id}) SET i.titulo_academico ='${titulo}', i.institucion = '${ins}', i.email = '${email}' RETURN i;`;
    const params = { id: parseInt(id) }
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatResponse(resultObj);
    res.send(result); 
});
/** PUT by name */
router.put('/nombre/:id', async function(req, res){
    const { id } = req.params.id;
    const {titulo, ins, email} = req.body;
    console.log('params', req.params);
    console.log('body', req.body)
    const query = `MATCH (i:Investigador {nombre_completo: $id}) SET i.titulo_academico = '${titulo}', i.institucion = '${ins}', i.email = '${email}' return i;`
    const params =  {id: id};
    const resultObj = await graphDBConnect.executeCypherQuery(query, params);
    const result = formatResponse(resultObj);
    res.send(result); 
});


module.exports = router;