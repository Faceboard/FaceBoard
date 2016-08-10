import io from 'socket.io-client';

let options = {
  'force new connection': true
};

let socket = io('http://localhost:3000', {'force new connection': true});
// let socket = io('https://face-board.herokuapp.com', {'force new connection': true});

socket.on('chat message', function(msg){
  console.log('ok');
});

socket.on('confirm test session', function (data) {
  console.log('THIS IS THE TEST SESSION', data);
});

export default socket;
