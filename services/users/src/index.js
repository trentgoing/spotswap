const { GraphQLServer, PubSub } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    pubsub,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/milton-lopez/spotswap/dev',
      secret: 'spotswap',
      debug: true,
    })
  })
});

// server.start(() => console.log(`Server is running on http://localhost:${process.env.PORT}`));
server.start(() => console.log(`Server is running on http://localhost:4000`));
