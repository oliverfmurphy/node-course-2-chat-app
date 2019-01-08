// open up a web socket and keep that connection open
var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  /*
  // emit an event, newEmail event was created in server.js
  socket.emit('createEmail', {
    to: 'receviver@example.com',
    text: 'Example text'
  });
  */

  /*
  // when emitting a custom event, the first arguement is the event name, the second argument is the data
  socket.emit('createMessage', {
    from: 'User1',
    text: 'Test one'
  });
  */
});



// The disconnect event fires whenever the connection drops
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

/*
// custom event
socket.on('newEmail', function(email) {
  console.log('New email', email);
});
*/

// custom event
socket.on('newMessage', function(message) {
  console.log('newMessage:', message);
});
