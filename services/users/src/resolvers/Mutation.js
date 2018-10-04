const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

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
};

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
};

function editUser (parent, args, context, info) {
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
};

function addLocation (parent, args, context, info) { //Working
  const userId = getUserId(context);
  return context.db.mutation.createLocation(
    {
      data: {   
        name: args.name,
        street1: args.street1,
        street2: args.street2,
        city: args.city,
        state: args.state,
        zip: args.zip,
        user: {
          connect: {
            id: userId
          }
        }
      }
    },
    info
  )
};

function editLocation (parent, args, context, info) { //Working
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
      where: {id: args.id}
    },
    info
  )
};

function deleteLocation (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.deleteLocation(
    {
      where: {id: args.id}
    },
    info
  )
};

function addCar (parent, args, context, info) { //Working
  const userId = getUserId(context);
  return context.db.mutation.createCar(
    {
      data: {
        size: args.size,
        make: args.make,
        model: args.model,
        color: args.color,
        plate: args.plate,
        state: args.state,
        user: {
          connect: {
            id: userId
          }
        }
      }
    },
    info
  )
};
function editCar (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.updateCar(
    {
      data: {
        size: args.size,
        make: args.make,
        model: args.model,
        color: args.color,
        plate: args.plate,
        state: args.state,
      },
      where: {id: args.id}
    },
    info
  )
};

function deleteCar (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.deleteCar(
    {
      where: {id: args.id}
    },
    info
  )
};

function addSpot (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.createSpot(
    {
      data: {
        user: {
          connect: {
            id: userId
          }
        },
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
      }
    },
    info
  )
};

function editSpot (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.updateSpot(
    {
      data: {
        user_id: userId,
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
      },
      where: {id: args.id}
    },
    info
  )
};

function deleteSpot (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.deleteSpot(
    {
      where: {id: args.id}
    },
    info
  )
};

function addListing (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.addListing(
    {
      data: {
        listing_user: {
          connect: {
            id: userId
          }
        },
        spot_id: args.spot_id,
        type: args.type,
        status: args.status,
        time_complete: args.time_complete
      }
    },
    info
  )
};

function editListing (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.addListing(
    {
      data: {
        claiming_user: {
          connect:{
            id: args.claiming_user_id
          }
        },
        type: args.type,
        status: args.status,
        time_complete: args.time_complete
      },
      where: {spot_id: args.spot_id}
    },
    info
  )
};

module.exports = {
  signup,
  login,
  editUser,
  addLocation,
  editLocation,
  deleteLocation,
  addCar,
  editCar,
  deleteCar,
  addSpot,
  editSpot,
  deleteSpot,
  addListing,
  editListing
};