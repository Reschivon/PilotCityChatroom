const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(socketio(socket));
client.configure(auth({
    storageKey: 'auth'
}));

export { client };
export const authenticationService = client.service('authentication');
export const userService = client.service('users');
export const messageService = client.service('messages');
export const roomService = client.service('rooms');








/* eslint-disable no-unused-vars */
const Realm = require("realm-web")
// const users = require("./users.ts");
// const schemas = require("./schemas.ts");

const app = new Realm.App({ id: "chatrooms-pezkx" });

export { app };
export async function handleLogin(email, password) {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    console.log("realm user login: ", user);
    return user;
  } catch(e) {
    console.log("failed realm login: ", e);
  }
};




export var registerUserEmailPassword = async function(email, password) {

  await app.emailPasswordAuth.registerUser(email, password);
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
      const user = await app.logIn(credentials);
      console.log("user: ", user);
  }
  catch(error) {
      console.log("registration error: ", error);
  }

}