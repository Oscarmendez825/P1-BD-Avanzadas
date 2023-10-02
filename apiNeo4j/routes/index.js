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
