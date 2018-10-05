const { getUserId } = require('../utils');

function user (parent, args, context, info) {
  if (!args.id && !args.email) {
    return context.db.query.user({ where: {user_name: args.user_name} }, info);
  }
  else if (!args.user_name && !args.id) {
    return context.db.query.user({ where: {email: args.email} }, info);
  }
  else {
    return context.db.query.user({ where: {id: args.id} }, info);
  }
}

function users (parent, args, context, info) {
  return context.db.query.users({}, info);
}

function location (parent, args, context, info) {
  return context.db.query.location({ where: {id: args.id} }, info);
}

function locations (parent, args, context, info) {
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
  return context.db.query.listings({}, info);
}

function openSpot (parent, args, context, info) {
  return context.db.query.spots({ where: {is_available: true} }, info);
}

module.exports = {
  user,
  users,
  location,
  locations,
  car,
  cars,
  spot,
  spots,
  listing,
  listings,
  openSpot
};