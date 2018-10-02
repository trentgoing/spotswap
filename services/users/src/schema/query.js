const graphql = require('graphql');
const UserModel = require('../models/User');
const Listings = require('../models/Listings');
const Location = require('../models/Locations');
const Car = require('../models/Car');
const Spot = require('../models/Spot');
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
  ListingType,
  SpotType
} = require('./typeDef.js');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLID},
        user_name: {type: GraphQLString},
        email: {type: GraphQLString}
      },
      resolve(parent, args) {
        if (!args.id && !args.email) {
          return UserModel.find({ where: {user_name: args.user_name} });
        }
        else if (!args.user_name && !args.id) {
          return UserModel.find({ where: {email: args.email} });
        }
        else {
          return UserModel.find({ where: {id: args.id} });
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.findAll({});
      }
    },
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
        return Location.findAll({where: {user_id: args.user_id}});
      }
    },
    car: {
      type: CarType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Car.find({where: {id: args.id}});
      }
    },
    cars: {
      type: new GraphQLList(CarType),
      args: {user_id: {type: GraphQLID}},
      resolve(parent, args) {
        return Car.findAll({where: {user_id: args.user_id}});
      }
    },
    spot: {
      type: SpotType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Spot.find({where: {id: args.id}});
      }
    },
    spots: {
      type: new GraphQLList(SpotType),
      args: {
        lat: {type:GraphQLString},
        lng: {type:GraphQLString}
      },
      resolve(parent, args) {
        return Spot.findAll({});
      }
    },
    listing: {
      type: ListingType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        listing_user_id: {type: GraphQLString},
        claiming_user_id: {type: GraphQLString},
        spot_id: {type: GraphQLString}
      },
      resolve(parent, args) {
        return Listings.find({ where: {id: args.id} });
      }
    }
    // listings: {
    //   type: new GraphQLList(ListingType),
    //   args: {
    //     listing_user_id: {type: GraphQLString},
    //     claiming_user_id: {type: GraphQLString},
    //     type: {type: GraphQLString},
    //     status: {type: GraphQLString}
    //   },
    //   resolve(parent, args){
    //     if ()
    //   }
    // }
  }
});

module.exports = { RootQuery };