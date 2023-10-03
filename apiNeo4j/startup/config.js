const config = require('config');

module.exports = function() {
  if (!config.get('BD_grafos')) {
    throw new Error('FATAL ERROR: dbHost is not defined.');
  }
};