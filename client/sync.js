import io from 'socket.io-client';
import { store } from './index';
import { getAllMessages } from './actions/chat';

let options = {
  'force new connection': true
};

// let socket = io('http://localhost:3000/test', options);
let socket = io('https://face-board.herokuapp.com/test', options);

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

socket.on('send message', function (data) {
  store.dispatch(getAllMessages());
});

export default socket;
