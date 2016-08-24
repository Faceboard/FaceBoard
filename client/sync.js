import io from 'socket.io-client';
import { store } from './index';
import { getAllMessages } from './actions/chat';
import { getPrivateMessages } from './actions/chat';
import { findFriend, onlineUser, offlineUser } from './helpers/friendHelpers';
import { fetchWhiteboard } from './actions/whiteboardConfig';
import { getAllFriends } from './actions/friends';
import { getRoomsForUser, getRoomMessages } from './actions/room';

let options = {
  'force new connection': true
};

export const constantUrl = 'https://face-board.herokuapp.com';
//export const constantUrl = 'http://localhost:3000';

let socket = io(constantUrl + '/test', options);

socket.on('userHasJoinedSession', (firstUsername) => {
  global.phone = PHONE({
    number: global.localStorage.username,
    publish_key: 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c',
    subscribe_key: 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe',
    media: {
      audio: true,
      video:
      {
        height:200,
        width:280
      }
    },
    ssl: true
  });

  phone.ready(() => {
    let secondName = global.localStorage.roomname.split('*')[1];
    let session = phone.dial(secondName);
  });

  phone.receive((session) => {

    session.connected((session) => {
      if (session.number !== global.localStorage.username) {
        document.getElementById('remoteVideo').appendChild(session.video);
      }
    });

  });

  if (firstUsername === global.localStorage.username) {
    store.dispatch(fetchWhiteboard());
  }
});

socket.on('userHasLeftSession', (mes) => {
  console.log(mes);
});

socket.on('user connected', (data) => {
  socket.emit('make sesssion', 'User has connected');
});

socket.on('send message', (data) => {
  store.dispatch(getAllMessages());
});

socket.on('send private message', (data) => {
  let sender = global.localStorage.seconduserid;
  if (data.useroneid !== global.localStorage.userid) {
    findFriend(data);
  }
  store.dispatch(getPrivateMessages(sender));
});

socket.on('sent message in room', (data) => {
  store.dispatch(getRoomMessages(data.roomid));
});

socket.on('confirm private chat', (data) => {
  if (data.seconduserid === global.localStorage.userid) {
    global.localStorage.pchat = data.pchat;
    socket.emit('join pchat', data);
  }
});

socket.on('pchat confirmed', (data) => {
  console.log('P CHAT CONFIRMED');
});

socket.on('deleted friend', (data) => {
  if (data.userid === global.localStorage.userid) {
    store.dispatch(getAllFriends());
  }
});

socket.on('deleted room', (data) => {
  if (data.userid === global.localStorage.userid) {
    store.dispatch(getRoomsForUser());
  }
});

socket.on('connect', (data) => {
  socket.emit('userConnected', {username: global.localStorage.username});
});

socket.on('userConnectedConfirmed', (data) => {
  console.log('user connected', data.username);
  onlineUser(data.username);
});

socket.on('disconnect', (data) => {
  socket.emit('userDisconnected', {username: global.localStorage.username});
});

socket.on('userDisconnectedConfirmed', (data) => {
  console.log('user disconnected', data.username);
  offlineUser(data.username);
});

export default socket;
