const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

//allow cross-origin
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    graphiql: true,
    context: { 
      request: request, 
      test: 'Example context value'
    }
  }))
);

var port = process.env.PORT;

app.listen(port, () => {
  console.log(`spot server listening on port ${port}!`);
});
