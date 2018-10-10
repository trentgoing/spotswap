const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam14bWU2NGxmamVnMGI0OHRlb29vZzBvIiwiaWF0IjoxNTM4ODYwNTc5fQ.2xuCNR-DwyzKzvRHqDxgNXqp8aep0gbgT6nsVjBcthA'
};

const client = new Lokka({
  transport: new Transport('http://localhost:4000', {headers})
});

// client.query(`
//   {
//     openSpot {
//       id
//       lat
//       lng
//       listing {
//         id
//       }
//     }
//   }
// `).then(result => {
//   console.log(result);
// });

// const filmInfo = client.createFragement(`
//   fragment on Film {
//     title, 
//     director,
//     releaseDate
//   }
// `);

// client.query(`
//   {
//     allFilms {
//       films {
//         ...${filmInfo}
//       }
//     }
//   }
// `).then(result => {
//   console.log(result.allFilms.films);
// });

// client.mutate(`{
//   newSpot: addSpot(
//     lat: "40.23444234",
//     lng: "-74.34442343"
//   ) {
//     id
//   }
// }`).then(response => {
//   console.log(response.newSpot);
// });

const mutationQuery = `($lat: String!, $lng: String!){
  newSpot: addSpot(lat: $lat, lng: $lng) {
    id
  }
}`;

const vars = {
  lat: '40.3334234',
  lng: '-74.333442343'
};

client.mutate(mutationQuery, vars).then(resp => {
  console.log(resp);
});


