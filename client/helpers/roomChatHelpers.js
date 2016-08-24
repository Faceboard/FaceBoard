import socket from '../sync';

export function sendRoomMessage () {
  let msg = document.getElementById('roomMessage')

  let msgObj = {
    text: msg.value,
    username: global.localStorage.username,
    userid: global.localStorage.userid,
    roomname: global.localStorage.currentRoom
  };
  msg.value = '';
  socket.emit('send message in room', msgObj);
};

export function sendRoomInvite (userInvited) {
  let roomInvObj = {
    roomname: global.localStorage.currentRoom,
    secondusername: userInvited,
    firstusername: global.localStorage.username
  };
  socket.emit('send room invite', roomInvObj);
};
