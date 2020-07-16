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

export {client};
export const messageService = client.service('messages');

client.reAuthenticate().then((obj) => {
  console.log(obj)
}).catch(e => {
  console.log(e)
})

messageService.on('created', message => console.log('Created a message', message));
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