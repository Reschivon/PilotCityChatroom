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
export const userService = client.service('users');
export const messageService = client.service('messages');
export const roomService = client.service('rooms');

// client.reAuthenticate().then((obj) => {
//   console.log(obj);
// }).catch(e => {
//   console.log(e)
// })
// messageService.on('created', message => {
//   console.log('Created a message', message);
//   messages.push(message)
// });
/*
// Use the messages service from the server
messageService.create({
  text: 'Message from client',
});
messageService.find({}).then((data) => {
  console.log("found messages: ", data);
})

socket.emit('find', 'messages', {}, (error, data) => {
  console.log('all messages', data)
});
messageService.find({}).then(messages => console.log(messages));
messageService.on('created', (e) => {
  console.log("event", e)
})
*/