const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true
// }));

app.get('/', (req, res) => res.send('Hello World!'));

var port = process.env.PORT;

app.listen(port, function() {
  console.log(`spot server listening on port ${port}!`);
});
