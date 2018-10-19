const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;
// const JWTAuthTransport = require('lokka-transport-jwt-auth');

const expireSpot = require('./expireSpot').expireSpot;
const updateRankings = require('./updateRankings').updateRankings;


// function refresh() {
//   const token = 'get-jwt';
//   return Promise.resolve(token);
// }
// const tr = new JWTAuthTransport('http://localhost:4000', refresh);
// ex: tr.send(`{ latestPosts { title } }`).then(console.log);

const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam5mNjZkMHMwMDJiMDg2MXY1amI3Y3VxIiwiaWF0IjoxNTM5OTA4MDk3fQ.JpOaWP9gmkLJ8Fng_qGL3OnfHtXNhS25Q6do9TY5wCo'
};

const client = new Lokka({
  transport: new Transport('http://159.65.235.20:4000', {
    headers
  })
});

var the_expire_interval = 10 * 1000; // 1min;
var the_ranking_interval =  10 * 1000; // 10 min

setInterval(async function() {
  await expireSpot(client);
}, the_expire_interval);

setInterval(async function() {
  await updateRankings(client);
}, the_ranking_interval);
