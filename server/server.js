// https://nodejs.org/dist/latest-v11.x/docs/api/path.html#path_path_join_paths
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    // emit the even newMessage
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      // createdAt propery created by the server to prevent a client from spoofing when a message was created
      createdAt: new Date().getTime()
    });
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
