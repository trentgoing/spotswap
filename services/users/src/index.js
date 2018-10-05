const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation
};

const server = new GraphQLServer({
  typeDefs : 'app/src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'app/src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/milton-lopez/spotswap/dev',
      secret: 'spotswap',
      debug: true,
    })
  })
});

server.start(() => console.log(`Server is running on http://localhost:${process.env.PORT}`));