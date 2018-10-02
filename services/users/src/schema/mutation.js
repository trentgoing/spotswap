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
  SpotType,
  resolverMap
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
            console.log('Error caught on addUser in mutation.js', err);
          });
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        user_name: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone_number: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parent, args) {
        return UserModel.update({
          user_name: args.user_name,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          phone_number: args.phone_number,
          password: args.password
        }, {
          where: {id: args.id}
        })
          .then(() => {
            return UserModel.find({where: {id: args.id}});
          })
          .catch((err) => {
            console.log('Error caught on editUser in mutation.js', err);
          });
      }
    },
    addLocation: {
      type: LocationType,
      args: {
        user_id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        street1: {type: new GraphQLNonNull(GraphQLString)},
        street2: {type: GraphQLString},
        city: {type: new GraphQLNonNull(GraphQLString)},
        state: {type: new GraphQLNonNull(GraphQLString)},
        zip: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        return Location.create({
          user_id: args.user_id,
          name: args.name,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip
        })
          .catch((err) => {
            console.log('Error caught on addLocation in mutation.js', err);
          });
      }
    },
    editLocation: {
      type: LocationType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        street1: {type: GraphQLString},
        street2: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        zip: {type: GraphQLInt}
      },
      resolve(parent, args) {
        return Location.update({
          name: args.name,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip
        }, {
          where: {id: args.id}
        })
          .then(() => {
            return Location.find({where: {id: args.id}});
          })
          .catch((err) => {
            console.log('Error caught on editLocation in mutation.js', err);
          });
      }
    },
    deleteLocation:{
      type: LocationType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        user_id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        return Location.destroy({where: {id: args.id}})
          .then(() => {
            return Location.findAll({where: {user_id: args.user_id}});
          })
          .catch((err) => {
            console.log('Error caught on deleteLocation in mutation.js', err);
          });
      }
    },
    addCar: {
      type: CarType,
      args: {
        size: {type: new GraphQLNonNull(GraphQLInt)},
        make: {type: new GraphQLNonNull(GraphQLString)},
        model: {type: GraphQLString},
        color: {type: new GraphQLNonNull(GraphQLString)},
        plate: {type: GraphQLString},
        state: {type: GraphQLString},
        user_id: {type: new GraphQLNonNull(GraphQLID)} 
      },
      resolve(parent, args) {
        return Car.create({
          size: args.size,
          make: args.make,
          model: args.model,
          color: args.color,
          plate: args.plate,
          state: args.state,
          user_id: args.user_id 
        })
          .catch((err) => {
            console.log('Error caught on addCar in mutation.js', err);
          });
      }
    },
    editCar: {
      type: CarType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        size: {type: GraphQLInt},
        make: {type: GraphQLString},
        model: {type: GraphQLString},
        color: {type: GraphQLString},
        plate: {type: GraphQLString},
        state: {type: GraphQLString},
        user_id: {type: GraphQLID} 
      },
      resolve(parent, args) {
        return Car.update({
          size: args.size,
          make: args.make,
          model: args.model,
          color: args.model,
          plate: args.plate,
          state: args.state,
        }, {
          where: {id: args.id}
        })
          .then(() => {
            return Car.find({where: {id: args.id}});
          })
          .catch((err) => {
            console.log('Error caught on editCar in mutation.js', err);
          });
      }
    },
    deleteCar: {
      type: CarType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        user_id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Car.destroy({where: {id: args.id}})
          .then(() => {
            return Car.findAll({where: {user_id: args.user_id}});
          })
          .catch((err) => {
            console.log('Error caught on deleteCar in mutation.js', err);
          });
      }
    },
    //add listing, edit listing


    addSpot: {
      type: SpotType,
      args: {
        user_id: {type: new GraphQLNonNull(GraphQLID)},
        lat: {type:GraphQLString},
        lng: {type:GraphQLString},
        street1: {type:GraphQLString},
        street2: {type:GraphQLString},
        city: {type:GraphQLString},
        state: {type:GraphQLString},
        zip: {type:GraphQLInt},
        type: {type: new GraphQLNonNull(GraphQLString)},
        start_time: {type: new GraphQLNonNull(resolverMap.Date)},
        end_time: {type:resolverMap.Date}
      },
      resolve(parent, args) {
        return Spot.create({
          user_id: args.user_id,
          lat: args.lat,
          lng: args.lng,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip,
          is_available: true,
          type: args.type,
          start_time: args.start_time,
          end_time: args.end_time
        })
          .catch((err) => {
            console.log('Error caught on addSpot in mutation.js', err);
          });
      }
    },
    editSpot: {
      type: SpotType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        user_id: {type: GraphQLID},
        lat: {type:GraphQLString},
        lng: {type:GraphQLString},
        street1: {type:GraphQLString},
        street2: {type:GraphQLString},
        city: {type:GraphQLString},
        state: {type:GraphQLString},
        zip: {type:GraphQLInt},
        type: {type: GraphQLString},
        start_time: {type: GraphQLString},
        end_time: {type:GraphQLString}
      },
      resolve(parent, args) {
        return Spot.update({
          user_id: args.user_id,
          lat: args.lat,
          lng: args.lng,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip,
          is_available: true,
          type: args.type,
          start_time: args.start_time,
          end_time: args.end_time
        }, {
          where: {id: args.id}
        })
          .then(() => {
            return Spot.find({where: {id: args.id}});
          })
          .catch((err) => {
            console.log('Error caught on editSpot in mutation.js', err);
          });
      }
    },
    deleteSpot: {
      type: SpotType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Spot.destroy({where: {id: args.id}})
          .then(() => {
            console.log('Success');
          })
          .catch((err) => {
            console.log('Error caught on deleteSpot in mutation.js', err);
          });
      }
    }
  }
});

module.exports = { Mutation };