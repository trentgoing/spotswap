const { getUserId } = require('../utils');

function userInfo (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.user({ where: {id: userId} }, info);
}

function location (parent, args, context, info) {
  return context.db.query.location({ where: {id: args.id} }, info);
}

function locations (parent, args, context, info) {
  console.log(context);
  const userId = getUserId(context);
  return context.db.query.locations({ where: {user: {id: userId }} }, info);
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
  return context.db.query.listings({}, info);
}

function myListings (parent, args, context, info) {
  const userId = getUserId(context);
  // return context.db.query.listings({ where: {listing_user: {id: userId}, type: 1, OR: [{ status: 1 }, { status: 2 }] } }, info);
  // get listings that are in status 1 = open or status 2 = claimed and either user is lister or claimer and type = 1 (reserved)
  return context.db.query.listings({ where: {AND: [{ OR: [{listing_user: {id: userId} }, {claiming_user: {id: userId}}]}, {type: 1}, {OR: [{ status: 1 }, { status: 2 }] } ]}}, info);
}

function openSpot (parent, args, context, info) {
  return context.db.query.spots({ where: {is_available: true} }, info);
}

module.exports = {
  userInfo,
  location,
  locations,
  car,
  cars,
  spot,
  spots,
  listing,
  listings,
  openSpot,
  myListings
};