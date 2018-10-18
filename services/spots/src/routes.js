const router = require('express').Router();
const controller = require('./controllers/index.js');

// routes all requests from the client to the controllers
router.get('/spot', controller.getSpots);
router.post('/spot', controller.createSpot);
router.put('/spot', controller.updateSpot);

module.exports = router;