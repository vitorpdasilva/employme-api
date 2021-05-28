const { AuthenticationError } = require('apollo-server');

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError('you must be logged in');
  }
  return next(root, args, context, info);
}

module.exports = {
  Query: {
    me: authenticated((root, args, context) => context.currentUser),
  }
}