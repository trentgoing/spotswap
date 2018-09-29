const db = require('../database/index');
const Sequelize = require('sequelize');

const Spot = db.define('spots', {
  coordinates: Sequelize.STRING,
  address: Sequelize.STRING,
  user_id: Sequelize.STRING,
  time_open : Sequelize.DATE,
  time_closed : Sequelize.DATE,
});

db.sync()
  .then(() => Spot.create({
    coordinates: 'test',
    time_open: new Date(2018, 9, 29),
    time_closed: new Date(1980, 9, 30),
    user_id: '1'
  }))
  .then(spot => {
    console.log(spot.toJSON());
  });



module.exports = {

  createSpot: function(spot) {
    return Spot.create({
      coordinates: spot.coordinates,
      address: spot.address,
      user_id : spot.userId,
      time_open : Date.now()
    })
      .catch((err) => {
        console.log(err);
      })
  },

  getSpots: function(spot) {
    return Spot.findAll({})
    .catch((err) => {
      console.log(err)
    })
  },

  updateSpot: function(spot) {
    return Spot.find({
      _id: spot._id
    })
      .then((spot) => {
        return spot;
      })
      .catch((err) => {
        console.log(err)
      })
  },
};