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


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        user_name: {type: new GraphQLNonNull(GraphQLString)},
        rating: {type:GraphQLInt},
        first_name: {type: new GraphQLNonNull(GraphQLString)},
        last_name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        phone_number: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return UserModel.create({
          user_name: args.user_name,
          rating: args.rating,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          phone_number: args.phone_number,
          password: args.password
        })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    addLocation: {
      type: LocationType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        street1: {type: new GraphQLNonNull(GraphQLString)},
        street2: {type: GraphQLString},
        city: {type: new GraphQLNonNull(GraphQLString)},
        state: {type: new GraphQLNonNull(GraphQLString)},
        zip: {type: new GraphQLNonNull(GraphQLInt)},
        user_id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Location.create({
          name: args.name,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip,
          user_id: args.user_id
        })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    // addListing: {
    //   type: ListingType,
    //   args: {
    //     listing_user: {type: new GraphQLNonNull(GraphQLID)},
    //     claiming_user: {type: new GraphQLNonNull(GraphQLID)},
    //     spot_id: {type: new GraphQLNonNull(GraphQLID)},
    //     type: {type: new GraphQLNonNull(GraphQLString)},
    //     status: {type: new GraphQLNonNull(GraphQLInt)},
    //     time_complete: Date
    //   },
    //   resolve(parent, args) {
    //     return Listings.create({
    //       listing_user: args.listing_user,
    //       claiming_user: args.claiming_user,
    //       spot_id: args.spot_id,
    //       type: args.type,
    //       status: args.status,
    //       time_complete: Date.now()
    //     });
    //   }
    // }

    // addBook: {
    //   type: BookType,
    //   args: {
    //     name: {type: GraphQLString},
    //     genre: {type: GraphQLString},
    //     authorId: {type: GraphQLID}
    //   },
    //   resolve(parent, args) {
    //     let book = new Book({
    //       name: args.name,
    //       genre: args.genre,
    //       authorId: args.authorId
    //     });
    //     return Book.save();
    //   }
    // }
  }
});

module.exports = { Mutation };