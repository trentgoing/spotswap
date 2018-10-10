const { getUserId } = require('../utils');


function location (parent, args, context, info) {
  return context.db.query.location({ where: {id: args.id} }, info);
}

function locations (parent, args, context, info) {
  console.log(context);
  const userId = getUserId(context);
  return context.db.query.locations({where: {user: {id: userId }}}, info);
}

function car (parent, args, context, info) {
  return context.db.query.car({ where: {id: args.id} }, info);
}

function cars (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.cars({ where: {user: {id: userId }} }, info);
}

function spot (parent, args, context, info) {
  return context.db.query.spot({ where: {id: args.id} }, info);
}

function spots (parent, args, context, info) {
  return context.db.query.spots({}, info);
}

function listing (parent, args, context, info) {
  return context.db.query.listing({ where: {id: args.id} }, info);
}

function listings (parent, args, context, info) {
  return context.db.query.listings({ }, info);
}

function myListings (parent, args, context, info) {
  const userId = getUserId(context);
  // return context.db.query.listings({ where: {listing_user: {id: userId}, type: 1, OR: [{ status: 1 }, { status: 2 }] } }, info);
  return context.db.query.listings({ where: {AND: [{ OR: [{listing_user: {id: userId} }, {claiming_user: {id: userId}}]}, {type: 1}, {OR: [{ status: 1 }, { status: 2 }] } ]}}, info);
}


function openSpot (parent, args, context, info) {
  return context.db.query.spots({ where: {is_available: true} }, info);
}

function expiredListings (parent, args, context, info) {
  return context.db.query.listings (
    {
      where: {
        spot: { 
          end_time_gte: args.date
        }
      } 
    }, info
  );
}

module.exports = {
  location,
  locations,
  car,
  cars,
  spot,
  spots,
  listing,
  listings,
  openSpot,
  myListings,
  expiredListings
};