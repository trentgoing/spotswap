const { getUserId } = require('../utils');


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

function openListings (parent, args, context, info) {
  return context.db.query.listings({ where: {status: 1} }, info);
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
  openListings
};