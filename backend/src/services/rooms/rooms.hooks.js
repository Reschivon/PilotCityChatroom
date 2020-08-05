const { ObjectId } = require('mongodb');
const logger = require('../../logger'); 

const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      // find only the chatrooms that the user is a part of
      context => {
        const {user} = context.params;
        context.params.query.users = ObjectId(user._id);
        return context;
      }
    ],
    get: [],
    create: [],
    update: [
      // change users ids from strings to ObjectId
      context => {
        context.data.users = context.data.users.map(user => {
          if (typeof(user) != ObjectId) user = ObjectId(user);
          return user;
        });
        return context;
      }
    ],
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
