const graphql = require('graphql');
const UserModel = require('../models/User');
const Listings = require('../models/Listings');
const Location = require('../models/Locations');
const Car = require('../models/Car');
const Kind = require('graphql/language');

const { 
  GraphQLObjectType, 
  GraphQLScalarType,
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  UserType,
  CarType,
  LocationType,
  ListingType
} = require('./typeDef.js');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    location: {
      type: LocationType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Location.find({id: args.id});
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      args: {user_id: {type: GraphQLID}},
      resolve(parent, args) {
        return Location.findAll({});
      }
    },
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLID},
        user_name: {type: GraphQLString},
        email: {type: GraphQLString}
      },
      resolve(parent, args) {
        return UserModel.find({where: {id: args.id}});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.findAll({});
      }
    }

    // book: {
    //   type: BookType,
    //   args: {id: {type: GraphQLID}},
    //   resolve(parent, args) {
    //     //code to get data from db
    //     //parent: when look at relationship between data
    //     return Book.findById(args.id);
    //   }
    // }
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve(parent, args) {
    //     // return authors;
    //     return Author.find();
    //   }
    // }
  }
});

module.exports = { RootQuery };