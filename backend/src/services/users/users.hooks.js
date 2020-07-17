const { authenticate } = require('@feathersjs/authentication').hooks;
const validator = require('validator');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), async context => {
      let input = context.data;
      //const userService = app.service('users');

      if (validator.isEmpty(input.firstname)) {
          throw new Error('Please enter your first name.');
      }
      if (validator.isEmpty(input.lastname)) {
        throw new Error('Please enter your last name.');
      }
      if (validator.isEmpty(input.email)) {
          throw new Error('Please enter your email address.');
      } else if (!validator.isEmail(input.email)) {
          throw new Error('Please enter a valid email address.');
      }
      if (validator.isEmpty(input.username)) {
        throw new Error('Please enter a username.');
      }
      if (validator.isEmpty(input.password)) {
          throw new Error('Please enter a password for your account.');
      }

      await context.service.find({
          query: {
              username: input.username
          }
      }).then((data) => {
           if (data.data.length) {
          throw new Error('This username is already in use by somebody else.');
      }
      })}
    ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
