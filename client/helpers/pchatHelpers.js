import socket from '../sync';


export function sendPrivateMessage () {
  let msg = document.getElementById('privateMessage');
  let msgObj = {
    text: msg.value,
    useroneid: global.localStorage.userid,
    usertwoid: global.localStorage.seconduserid,
    useronename: global.localStorage.username,
    usertwoname: global.localStorage.secondusername,
    chatRoom: global.localStorage.pchat
  };
  socket.emit('send private message', msgObj);
  msg.value = '';
}