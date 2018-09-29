const spotModel = require('../models/Spot');

module.exports = {
  
  getSpots: (req, res) => {
    spotModel.getSpots(req.data)
      .then((data) => {res.send(data)})
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  createSpot: (req, res) => {
    spotModel.createSpot(req.body)
      .then(({data}) => {res.sendStatus(201)})
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  updateSpot: (req, res) => {
    spotModel.updateSpot(req.data)
      .then(({data}) => {res.sendStatus(201)})
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

}