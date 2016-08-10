import io from 'socket.io-client';

let options = {
  'force new connection': true
};

let socket = io('http://localhost:3000', options);
// let socket = io('https://face-board.herokuapp.com', {'force new connection': true});

socket.on('userWantsToCreateSession', function (data) {
  console.log('THIS IS THE COFIRMING TEST SESSION EVENT', data);
});

socket.on('user connected', function (data) {
  console.log(data);
  socket.emit('make sesssion', "User has connected");
});


export default socket;
