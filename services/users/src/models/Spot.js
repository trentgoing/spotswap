const mainDB = require('../database');
const Sequelize = require('sequelize');

const Spot = mainDB.define('spot', {
  user_id: Sequelize.STRING,
  lat: Sequelize.STRING,
  lng: Sequelize.STRING,
  street1: Sequelize.STRING,
  street2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.INTEGER,
  is_available: Sequelize.BOOLEAN,
  type: Sequelize.STRING,
  start_time: Sequelize.DATE,
  end_time: Sequelize.DATE
});

mainDB.sync();

module.exports = Spot;