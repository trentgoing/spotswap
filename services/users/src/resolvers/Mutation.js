const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup (parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login (parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

const Mutation = {
  editUser: (parent, args, context, info) => {
    const userId = getUserId(context);
    return context.db.mutation.updateUser(
      {
        data: {
          user_name: args.user_name,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          phone_number: args.phone_number,
          password: args.password
        },
        where: {id: userId}
      },
      info
    )
  },
  addLocation: (parent, args, context, info) => {
    const userId = getUserId(context);
    return context.db.mutation.createLocation({
        data: {   
          user_id: userId,
          name: args.name,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip
        }
      },
      info
    )
  },
  editLocation: (parent, args, context, info) => {
    const userId = getUserId(context);
    return context.db.mutation.updateLocation(
      {
        data: {
          name: args.name,
          street1: args.street1,
          street2: args.street2,
          city: args.city,
          state: args.state,
          zip: args.zip
        },
        where: {id: userId}
      },
      info
    )
  }
  // deleteLocation: (parent, args, context, info) => {
  //   type: LocationType,
  //   args: {
  //     id: {type: new GraphQLNonNull(GraphQLID)},
  //     user_id: {type: new GraphQLNonNull(GraphQLID)}
  //   },
  //   resolve(parent, args, context){
  //     const userId = getUserId(context);
  //     return Location.destroy({where: {id: args.id}})
  //       .then(() => {
  //         return Location.findAll({where: {user_id: args.user_id}});
  //       })
  //       .catch((err) => {
  //         console.log('Error caught on deleteLocation in mutation.js', err);
  //       });
  //   }
  // },
  // addCar: (parent, args, context, info) => {
  //   type: CarType,
  //   args: {
  //     size: {type: new GraphQLNonNull(GraphQLInt)},
  //     make: {type: new GraphQLNonNull(GraphQLString)},
  //     model: {type: GraphQLString},
  //     color: {type: new GraphQLNonNull(GraphQLString)},
  //     plate: {type: GraphQLString},
  //     state: {type: GraphQLString}
  //   },
  //   resolve(parent, args, context) {
  //     const userId = getUserId(context);
  //     return Car.create({
  //       size: args.size,
  //       make: args.make,
  //       model: args.model,
  //       color: args.color,
  //       plate: args.plate,
  //       state: args.state,
  //       user_id: userId 
  //     })
  //       .catch((err) => {
  //         console.log('Error caught on addCar in mutation.js', err);
  //       });
  //   }
  // },
  // editCar: (parent, args, context, info) => {
  //   type: CarType,
  //   args: {
  //     id: {type: new GraphQLNonNull(GraphQLID)},
  //     size: {type: GraphQLInt},
  //     make: {type: GraphQLString},
  //     model: {type: GraphQLString},
  //     color: {type: GraphQLString},
  //     plate: {type: GraphQLString},
  //     state: {type: GraphQLString},
  //   },
  //   resolve(parent, args, context) {
  //     const userId = getUserId(context);
  //     return Car.update({
  //       size: args.size,
  //       make: args.make,
  //       model: args.model,
  //       color: args.model,
  //       plate: args.plate,
  //       state: args.state,
  //     }, {
  //       where: {id: args.id}
  //     })
  //       .then(() => {
  //         return Car.find({where: {id: args.id}});
  //       })
  //       .catch((err) => {
  //         console.log('Error caught on editCar in mutation.js', err);
  //       });
  //   }
  // },
  // deleteCar: (parent, args, context, info) => {
  //   type: CarType,
  //   args: {
  //     id: {type: new GraphQLNonNull(GraphQLID)}
  //   },
  //   resolve(parent, args, context) {
  //     const userId = getUserId(context);
  //     return Car.destroy({where: {id: args.id}})
  //       .then(() => {
  //         return Car.findAll({where: {user_id: userId}});
  //       })
  //       .catch((err) => {
  //         console.log('Error caught on deleteCar in mutation.js', err);
  //       });
  //   }
  // },
  // //add listing, edit listing
  // addSpot: (parent, args, context, info) => {
  //   type: SpotType,
  //   args: {
  //     user_id: {type: new GraphQLNonNull(GraphQLID)},
  //     lat: {type:GraphQLString},
  //     lng: {type:GraphQLString},
  //     street1: {type:GraphQLString},
  //     street2: {type:GraphQLString},
  //     city: {type:GraphQLString},
  //     state: {type:GraphQLString},
  //     zip: {type:GraphQLInt},
  //     type: {type: new GraphQLNonNull(GraphQLString)},
  //     start_time: {type: new GraphQLNonNull(resolverMap.Date)},
  //     end_time: {type:resolverMap.Date}
  //   },
  //   resolve(parent, args) {
  //     return Spot.create({
  //       user_id: args.user_id,
  //       lat: args.lat,
  //       lng: args.lng,
  //       street1: args.street1,
  //       street2: args.street2,
  //       city: args.city,
  //       state: args.state,
  //       zip: args.zip,
  //       is_available: true,
  //       type: args.type,
  //       start_time: args.start_time,
  //       end_time: args.end_time
  //     })
  //       .catch((err) => {
  //         console.log('Error caught on addSpot in mutation.js', err);
  //       });
  //   }
  // },
  // editSpot: (parent, args, context, info) => {
  //   type: SpotType,
  //   args: {
  //     id: {type: new GraphQLNonNull(GraphQLID)},
  //     user_id: {type: GraphQLID},
  //     lat: {type:GraphQLString},
  //     lng: {type:GraphQLString},
  //     street1: {type:GraphQLString},
  //     street2: {type:GraphQLString},
  //     city: {type:GraphQLString},
  //     state: {type:GraphQLString},
  //     zip: {type:GraphQLInt},
  //     type: {type: GraphQLString},
  //     start_time: {type: GraphQLString},
  //     end_time: {type:GraphQLString}
  //   },
  //   resolve(parent, args) {
  //     return Spot.update({
  //       user_id: args.user_id,
  //       lat: args.lat,
  //       lng: args.lng,
  //       street1: args.street1,
  //       street2: args.street2,
  //       city: args.city,
  //       state: args.state,
  //       zip: args.zip,
  //       is_available: true,
  //       type: args.type,
  //       start_time: args.start_time,
  //       end_time: args.end_time
  //     }, {
  //       where: {id: args.id}
  //     })
  //       .then(() => {
  //         return Spot.find({where: {id: args.id}});
  //       })
  //       .catch((err) => {
  //         console.log('Error caught on editSpot in mutation.js', err);
  //       });
  //   }
  // },
  // deleteSpot: (parent, args, context, info) => {
  //   type: SpotType,
  //   args: {
  //     id: {type: new GraphQLNonNull(GraphQLID)}
  //   },
  //   resolve(parent, args) {
  //     return Spot.destroy({where: {id: args.id}})
  //       .then(() => {
  //         console.log('Success');
  //       })
  //       .catch((err) => {
  //         console.log('Error caught on deleteSpot in mutation.js', err);
  //       });
  //   }
  // },
}

module.exports = {
  signup,
  login,
  Mutation
}