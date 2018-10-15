var express = require('express');
var bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();

var app = express();

// MIGHT BE USED FOR DEV ENVs????
// app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
app.use('/spot_api', routes);
app.get('/ping', (req, res) => res.send('pong'));
var port = process.env.PORT;

app.listen(port, function() {
  console.log(`spot server listening on port ${port}!`);
});
