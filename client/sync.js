import io from 'socket.io-client';

let options = {
  'force new connection': true
};

let socket = io('http://localhost:3000/test', options);
// let socket = io('https://face-board.herokuapp.com/test', options);

socket.on('userWantsToCreateSession', function (roomname) {
  console.log('THIS IS THE USER WANTS TO CREATE SESSION EVENT', roomname);
  socket.emit('testing', roomname);
});

socket.on('user connected', function (data) {
  console.log(data);
  socket.emit('make sesssion', "User has connected");
});

socket.on('privateTest', function (roomname) {
  console.log('THIS IS A PRIVATE TEST IN ', roomname);
})


export default socket;
