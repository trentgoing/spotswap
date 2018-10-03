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
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type:GraphQLID},
    default_car: {
      type: CarType,
      resolve(parent, args) {
        return Car.find({ id: parent.default_car_id });
      }
    },
    user_name: {type:GraphQLString},
    rating: {type:GraphQLInt},
    first_name: {type:GraphQLString},
    last_name: {type:GraphQLString},
    email: {type:GraphQLString},
    phone_number: {type:GraphQLString},
    password: {type:GraphQLString},
    locations: { // findAll is not working
      type: LocationType,
      resolve(parent, args) {
        return Location.findAll({where: {user_id: parent.id}});
      }
    }
  })
});

// var SizeType = new GraphQLEnumType({
//   name: 'Size',
//   values: {
//     small: { value: 1 },
//     medium: { value: 2},
//     large: { value: 3 }
//   }
// });

const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: {type:GraphQLID},
    user_id: {type:GraphQLID},
    size: {type:GraphQLInt},
    make: {type:GraphQLString},
    model: {type:GraphQLString},
    color: {type:GraphQLString},
    plate: {type:GraphQLString},
    state: {type:GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.find({ id: parent.user_id });
      }
    }
  })
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    id: {type:GraphQLID},
    user_id: {type:GraphQLID},
    name: {type:GraphQLString},
    street1: {type:GraphQLString},
    street2: {type:GraphQLString},
    city: {type:GraphQLString},
    state: {type:GraphQLString},
    zip: {type:GraphQLInt},
    lat: {type:GraphQLString},
    lng: {type:GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.find({ id: parent.user_id });
      }
    }
  })
});

const ListingType = new GraphQLObjectType({
  name: 'Listing',
  fields: () => ({ 
    listing_user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.find({ id: parent.listing_user_id });
      }
    },
    claiming_user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.find({ id: parent.claiming_user_id });
      }
    },
    spot_id: {
      type: SpotType,
      resolve(parent, args) {
        return Spot.find({ id: parent.spot_id });
      }
    },
    type: {type:GraphQLString},
    status: {type:GraphQLInt},
    // time_complete: Date
  })
});

const SpotType = new GraphQLObjectType({
  name: 'Spot',
  fields: () => ({
    id: {type:GraphQLID},
    user_id: {type:GraphQLID},
    lat: {type:GraphQLString},
    lng: {type:GraphQLString},
    street1: {type:GraphQLString},
    street2: {type:GraphQLString},
    city: {type:GraphQLString},
    state: {type:GraphQLString},
    zip: {type:GraphQLInt},
    is_available: {type:GraphQLBoolean},
    type: {type:GraphQLString},
    start_time: {type: resolverMap.Date},
    end_time: {type: resolverMap.Date},
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.find({ id: parent.user_id });
      }
    }
  })
});

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields:() => ({
    token: {type:GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.find({ id: parent.user_id});
      }
    }
  })
});

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  })
};

module.exports = {
  UserType,
  CarType,
  LocationType,
  ListingType,
  SpotType,
  AuthPayload,
  resolverMap
};