const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();

//allow cross-origin

app.use(cors());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

var port = process.env.PORT;

app.listen(port, () => {
  console.log(`spot server listening on port ${port}!`);
});
