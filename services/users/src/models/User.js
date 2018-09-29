const mainDB = require('../database');
const Sequelize = require('sequelize');

const User = mainDB.define('user', {
  default_car_id: Sequelize.STRING,
  user_name: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone_number: Sequelize.INTEGER,
  password: Sequelize.STRING
});

mainDB.sync();


module.exports = User;