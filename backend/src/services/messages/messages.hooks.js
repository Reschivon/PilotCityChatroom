const { authenticate } = require('@feathersjs/authentication').hooks;

const populateUser = require('../../hooks/populate-user');
const processMessage = require('../../hooks/process-message');
const restrictMessages = require('../../hooks/restrict-messages');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [restrictMessages()],
    get: [],
    create: [processMessage()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [/*populateUser()*/],
    find: [],
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
