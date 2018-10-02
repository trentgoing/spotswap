const graphql = require('graphql');
const { RootQuery } = require('./query.js');
const { Mutation } = require('./mutation.js');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});