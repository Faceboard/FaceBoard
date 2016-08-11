import io from 'socket.io-client';

let options = {
  'force new connection': true
};

// let socket = io('http://localhost:3000/test', options);
let socket = io('https://face-board-pr-25.herokuapp.com/test', options);

// socket.on('userWantsToCreateSession', function (data) {
//   if (global.localStorage.username === data.secondUserName && !global.localStorage.inSession) {
//     if (confirm(data.firstUserName + ' wants to create a private session with you. Would you like to join?')) {
//       socket.emit('userWantsToJoinSession', data);
//       global.localStorage.inSession = true;
//     }
//   }
// });

socket.on('userWantsToCreateSession', function (data) {
  if (global.localStorage.username === data.secondUserName) {
    confirm(data.firstUserName + ' wants to create a private session with you. Would you like to join?') ?
      socket.emit('userWantsToJoinSession', data) : null;
  }
  console.log('THIS IS THE USER WANTS TO CREATE SESSION EVENT', roomname);
  socket.emit('testing', roomname);
});

socket.on('userHasJoinedSession', function (mes) {
  console.log(mes);
});

socket.on('userHasLeftSession', function (mes) {
  console.log(mes);
});

socket.on('user connected', function (data) {
  console.log(data);
  socket.emit('make sesssion', 'User has connected');
});


export default socket;
