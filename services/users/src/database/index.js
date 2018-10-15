const Sequelize = require('sequelize');

var conString = process.env.DATABASE_URL;

const mainDB = new Sequelize(conString, {
  operatorsAliases: false,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports = mainDB;