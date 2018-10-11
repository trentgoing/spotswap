const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;
// const JWTAuthTransport = require('lokka-transport-jwt-auth');
const moment = require('moment');


// function refresh() {
//   const token = 'get-jwt';
//   return Promise.resolve(token);
// }
// const tr = new JWTAuthTransport('http://localhost:4000', refresh);
// ex: tr.send(`{ latestPosts { title } }`).then(console.log);


const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam14bWU2NGxmamVnMGI0OHRlb29vZzBvIiwiaWF0IjoxNTM4ODYwNTc5fQ.2xuCNR-DwyzKzvRHqDxgNXqp8aep0gbgT6nsVjBcthA'
};
const client = new Lokka({
  transport: new Transport('http://localhost:4000', {
    headers
  })
});

const mutationQuery = `($date: DateTime!, $isWorker: Boolean){
  expireSpot: expireSpot(date: $date,isWorker: $isWorker) {
      count
  }
}`;

const vars = {
  date: moment().toISOString(),
  isWorker: true
};

var minutes = 1, the_interval = minutes * 10 * 1000;
setInterval(function() {
  client.mutate(mutationQuery, vars).then(resp => {
    console.log('Expired ' + resp.expireSpot.count + ' spots at ' + moment().toISOString() + '.');
  });
}, the_interval);