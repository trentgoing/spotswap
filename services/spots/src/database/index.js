const Sequelize = require('sequelize');
const Spot = require('../models/Spot');
const Op = Sequelize.Op;

var conString = process.env.DATABASE_URL;

const db = new Sequelize(conString, {
  operatorsAliases: false,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// console.log(JSON.stringify(Spot))

// db.sync()
//   .then(() => Spot.createSpot({
//     coordinates: 'test',
//     time_open: new Date(2018, 9, 29),
//     time_closed: new Date(1980, 9, 30),
//     user_id: '1'
//   }))
//   .then(spot => {
//     console.log(spot.toJSON());
//   });

module.exports = db;