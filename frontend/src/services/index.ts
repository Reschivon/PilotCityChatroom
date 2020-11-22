import io from'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

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
import Realm from "realm-web";
// const users = require("./users.ts");
// const schemas = require("./schemas.ts");

const app = new Realm.App({ id: "chatrooms-pezkx" });

export { app };
export async function loginUserEmailPassword(email: string, password: string) {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    console.log("realm user login: ", user);
    return user;
  } catch(e) {
    console.log("failed realm login: ", e);
  }
};


export async function registerUserEmailPassword(email: string, password: string) {
  await app.emailPasswordAuth.registerUser(email, password);
  const credentials = Realm.Credentials.emailPassword(email, password);

  try {
      const user = await app.logIn(credentials);
      console.log("user: ", user);
      return user;
  }
  catch(error) {
      console.log("registration error: ", error);
  }
};

export async function updateUserDocument(userId: string) {
  
};