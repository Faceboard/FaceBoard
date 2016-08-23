import socket from '../sync';

export function sendRoomMessage () {
  let msg = document.getElementById('roomMessage').value;
  let msgObj = {
    text: msg,
    username: global.localStorage.username,
    userid: global.localStorage.userid,
    roomname: global.localStorage.currentRoom,
    // THIS STILL NEEDS TO BE SET
    roomid: global.localStorage.roomid;
  };
  socket.emit('send message in room', msgObj);
}