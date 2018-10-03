const mainDB = require('../database');
const Sequelize = require('sequelize');

const Car = mainDB.define('car', {
  user_id: Sequelize.STRING,
  size: Sequelize.INTEGER,
  make: Sequelize.STRING,
  model: Sequelize.STRING,
  color: Sequelize.STRING,
  plate: Sequelize.STRING,
  state: Sequelize.STRING,
});

module.exports = Car;