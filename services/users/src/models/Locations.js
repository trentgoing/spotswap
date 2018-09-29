const mainDB = require('../database');
const Sequelize = require('sequelize');

const Location = mainDB.define('location', {
  user_id: Sequelize.STRING,
  name: Sequelize.STRING,
  street1: Sequelize.STRING,
  street2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.INTEGER,
  lat: Sequelize.STRING,
  lng: Sequelize.STRING
});

module.exports = Location;