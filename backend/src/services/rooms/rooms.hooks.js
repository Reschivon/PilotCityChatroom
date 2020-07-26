const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      // find only the chatrooms that the user is a part of
      context => {
        const {user} = context.params;
        context.params.query.users = String(user._id);
        return context;
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      // useful for debugging
      /*
      context => {
        context.result.data = {
          ...context.result.data,
          params: context.params
        };
        return context;
      }
      */
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
