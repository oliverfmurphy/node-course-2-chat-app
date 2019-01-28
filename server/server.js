// https://nodejs.org/dist/latest-v11.x/docs/api/path.html#path_path_join_paths
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// use ES6 destructuring to grab generateMessage
// now we have access to generateMessage we can call it rather than generating objects below
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

// new express app
var app = express();
/*
var server = http.createServer((req, res) => {
});
*/
// same as above as express heavily integrated with express
var server = http.createServer(app);
// io is now our websocket server which we will use to emit and listen to events
var io = socketIO(server);

// io.on lets you register an event listener
// io.on('connection') lets you listen for a new connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // emit a message to everyone about a user who just joined
  /*
  socket.emit('newMessage', {
    from: 'admin@example.com',
    text: 'Welcome to the app!',
    // createdAt propery created by the server to prevent a client from spoofing when a message was created
    createdAt: new Date().getTime()
  });
  */
  socket.emit('newMessage', generateMessage('Admin', 'Welcome'));

  // emit a message to everyone else apart from the user who just joined
  /*
  socket.broadcast.emit('newMessage', {
    from: 'admin@example.com',
    text: 'New user joined',
    // createdAt propery created by the server to prevent a client from spoofing when a message was created
    createdAt: new Date().getTime()
  });
  */
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // emit a custom event without data
  // socket.emit('newEmail');

  /*
  // emit a custom event with data
  socket.emit('newEmail', {
    from: 'mik@example.com',
    text: 'test text',
    createdAt: 123
  });
  */

  /*
  // custom event listenter example
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });
  */

  // custom event listenter
  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);

    // io.emit emits an event to every single connection
    // emit the event newMessage
    /*
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      // createdAt propery created by the server to prevent a client from spoofing when a message was created
      createdAt: new Date().getTime()
    });
    */
    io.emit('newMessage', generateMessage(message.from, message.text));

    /*
    // to broadcast the message we have to specify an individual socket
    // broadcast the event to everybody but this socket
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      // createdAt propery created by the server to prevent a client from spoofing when a message was created
      createdAt: new Date().getTime()
    });
    */
  });

  //
  socket.emit('newMessage', {
    from: 'User 2',
    text: 'test 2',
    createdAt: 123123
  });

  // The disconnect event fires whenever the connection drops
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

});


// configure middleware
app.use(express.static(publicPath))

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
