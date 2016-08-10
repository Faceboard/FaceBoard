import io from 'socket.io-client';

options = {
  transports: ['websocket'],
  'force new connection': true
};

let socket = io('https://face-board.herokuapp.com', {'force new connection': true});

socket.on('chat message', function(msg){
  console.log('ok');
});

export default socket;
