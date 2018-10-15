// const graphql = require('graphql');
// const _ = require('lodash');
// // const User = require('../models/User');
// // const Listings = require('../models/Listings');
// const Kind = require('graphql/language');

// const { 
//   GraphQLObjectType, 
//   GraphQLString, 
//   GraphQLSchema,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLList
// } = graphql;

// // dummy data
// // var books = [
// //   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
// //   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
// //   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
// //   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
// //   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
// //   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// // ];

// // var authors = [
// //   { name: 'Patrick Rothfuss', age: 44, id: '1' },
// //   { name: 'Brandon Sanderson', age: 42, id: '2' },
// //   { name: 'Terry Pratchett', age: 66, id: '3' }
// // ];

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: {type:GraphQLID},
//     default_car: {
//       type: CarType,
//       resolve(parent, args) {
//         return Car.find({ _id: parent.car_id });
//       }
//     },
//     user_name: {type:GraphQLString},
//     rating: {type:GraphQLInt},
//     first_name: {type:GraphQLString},
//     last_name: {type:GraphQLString},
//     email: {type:GraphQLString},
//     phone_number: {type:GraphQLInt},
//     password: {type:GraphQLString}
//   })
// });

// const CarType = new GraphQLObjectType({
//   name: 'Car',
//   fields: () => ({
//     id: {type:GraphQLID},
//     size: {type:GraphQLInt},
//     make: {type:GraphQLString},
//     model: {type:GraphQLString},
//     color: {type:GraphQLString},
//     plate: {type:GraphQLString},
//     state: {type:GraphQLString},
//     user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.find({ _id: parent.user_id });
//       }
//     }
//   })
// });

// const LocationType = new GraphQLObjectType({
//   name: 'Location',
//   fields: () => ({
//     id: {type:GraphQLID},
//     name: {type:GraphQLString},
//     street1: {type:GraphQLString},
//     street2: {type:GraphQLString},
//     city: {type:GraphQLString},
//     state: {type:GraphQLString},
//     zip: {type:GraphQLInt},
//     lat: {type:GraphQLString},
//     lng: {type:GraphQLString},
//     user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.find({ _id: parent.user_id });
//       }
//     }
//   })
// });

// const ListingType = new GraphQLObjectType({
//   name: 'Listing',
//   fields: () => ({
//     listing_user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.find({ _id: parent.listing_user_id });
//       }
//     },
//     claiming_user: {
//       type: UserType,
//       resolve(parent, args) {
//         return User.find({ _id: parent.claiming_user_id });
//       }
//     },
//     spot_id: {type:GraphQLString},
//     type: {type:GraphQLString},
//     status: {type:GraphQLInt},
//     time_complete: Date
//   })
// });

// const resolverMap = {
//   Date: new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     parseValue(value) {
//       return new Date(value); // value from the client
//     },
//     serialize(value) {
//       return value.getTime(); // value sent to the client
//     },
//     parseLiteral(ast) {
//       if (ast.kind === Kind.INT) {
//         return new Date(ast.value) // ast value is always in string format
//       }
//       return null;
//     },
//   }),
// };

// const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   fields: () => ({
//     id: {type:GraphQLID},
//     name: {type:GraphQLString},
//     age: {type:GraphQLInt},
//     books: {
//       type: new GraphQLList(BookType),
//       resolve(parent, args) {
//         // return _.filter(books, {authorId: parent.id});
//         return Book.find({authorId: parent.id})
//       }
//     }
//   })
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     book: {
//       type: BookType,
//       args: {id: {type: GraphQLID}},
//       resolve(parent, args) {
//         //code to get data from db
//         //parent: when look at relationship between data
//         // return _.find(books, {id: args.id});
//         return Book.findById(args.id);
//       }
//     },
//     author: {
//       type: AuthorType,
//       args: {id: {type: GraphQLID}},
//       resolve(parent, args) {
//         // return _.find(authors, {id: args.id});
//         return Author.findById(args.id);
//       }
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve(parent, args) {
//         // return books;
//         return Book.find();
//       }
//     },
//     authors: {
//       type: new GraphQLList(AuthorType),
//       resolve(parent, args) {
//         // return authors;
//         return Author.find();
//       }
//     }
//   }
// });

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addAuthor: {
//       type: AuthorType,
//       args: {
//         name: {type: GraphQLString},
//         age: {type: GraphQLInt}
//       },
//       resolve(parent, args) {
//         let author = new Author({
//           name: args.name,
//           age: args.age
//         });
//         return Author.save();
//       }
//     },
//     addBook: {
//       type: BookType,
//       args: {
//         name: {type: GraphQLString},
//         genre: {type: GraphQLString},
//         authorId: {type: GraphQLID}
//       },
//       resolve(parent, args) {
//         let book = new Book({
//           name: args.name,
//           genre: args.genre,
//           authorId: args.authorId
//         });
//         return Book.save();
//       }
//     }
//   }
// })


// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// });