const neo4j = require('neo4j-driver');
//const config = require('../config');

const uri = "bolt://54.162.109.115:7687";
const user = "neo4j";
const password = "tar-weddings-approaches";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const session = driver.session();
exports.getSession = function (context) {
  if(context.neo4jSession) {
    return context.neo4jSession;
  }
  else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};
async function executeCypherQuery(statement, params = {}) {
  try {
    const result = session.run(statement, params);
    return result;
  } catch (error) {
    throw error; // we are logging this error at the time of calling this method
  }
}

module.exports = { executeCypherQuery };