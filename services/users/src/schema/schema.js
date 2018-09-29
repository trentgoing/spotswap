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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type:GraphQLID},
    default_car: {
      type: CarType,
      resolve(parent, args) {
        return Car.find({ _id: parent.default_car_id });
      }
    },
    user_name: {type:GraphQLString},
    rating: {type:GraphQLInt},
    first_name: {type:GraphQLString},
    last_name: {type:GraphQLString},
    email: {type:GraphQLString},
    phone_number: {type:GraphQLString},
    password: {type:GraphQLString}
  })
});

const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: {type:GraphQLID},
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
    name: {type:GraphQLString},
    street1: {type:GraphQLString},
    street2: {type:GraphQLString},
    city: {type:GraphQLString},
    state: {type:GraphQLString},
    zip: {type:GraphQLInt},
    lat: {type:GraphQLString},
    lng: {type:GraphQLString},
    user_id: {type:GraphQLID},
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
    spot_id: {type:GraphQLID},
    type: {type:GraphQLString},
    status: {type:GraphQLInt},
    time_complete: Date
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
  }),
};

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
        console.log(args.id);
        return UserModel.find({where: {id: args.id}});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.findAll({});
      }
    },

    // book: {
    //   type: BookType,
    //   args: {id: {type: GraphQLID}},
    //   resolve(parent, args) {
    //     //code to get data from db
    //     //parent: when look at relationship between data
    //     // return _.find(books, {id: args.id});
    //     return Book.findById(args.id);
    //   }
    // },
    // author: {
    //   type: AuthorType,
    //   args: {id: {type: GraphQLID}},
    //   resolve(parent, args) {
    //     // return _.find(authors, {id: args.id});
    //     return Author.findById(args.id);
    //   }
    // },
    // books: {
    //   type: new GraphQLList(BookType),
    //   resolve(parent, args) {
    //     // return books;
    //     return Book.find();
    //   }
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve(parent, args) {
    //     // return authors;
    //     return Author.find();
    //   }
    // }
  }
});

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


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});