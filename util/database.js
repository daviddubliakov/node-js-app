const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'node-complete',
  'root',
  'David2002',
  { host: 'localhost', dialect: 'mysql' }
);

module.exports = sequelize;
