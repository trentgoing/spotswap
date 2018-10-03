function users (parent, args, context, info) {
  // if (!args.id && !args.email) {
  //   return context.db.query.user({ where: {user_name: args.user_name} }, info);
  // }
  // else if (!args.user_name && !args.id) {
  //   return context.db.query.user({ where: {email: args.email} }, info);
  // }
  // else {
  //   return context.db.query.user({ where: {id: args.id} }, info);
  // }
  return context.db.query.users({}, info);
}

module.exports = {
  users,
};