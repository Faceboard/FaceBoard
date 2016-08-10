import io from 'socket.io-client';

let socket = io.connect('https://face-board.herokuapp.com');

socket.on('remote update', function(data) {
  console.log(data);
});