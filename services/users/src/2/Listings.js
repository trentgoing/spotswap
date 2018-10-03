const mainDB = require('../database');
const Sequelize = require('sequelize');

const Listing = mainDB.define('listing', {
  listing_user_id: Sequelize.STRING,
  claiming_user_id: Sequelize.STRING,
  spot_id: Sequelize.STRING,
  type: Sequelize.STRING,
  status: Sequelize.INTEGER,
  time_complete: Sequelize.DATE
});

module.exports = Listing;