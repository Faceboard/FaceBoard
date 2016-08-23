import axios from 'axios';
import { constantUrl } from './sync';
import socket from './sync';

export function signIn (username, password) {
  return axios.post(constantUrl + '/users/signin', {
    username,
    password
  })
  .then(res => {
    setUserInfo(res);
  });
}

export function signUp (username, password) {
  return axios.post(constantUrl + '/users/signup', {
    username,
    password
  })
  .then(res => {
    setUserInfo(res);
  });
}

function setUserInfo (res) {
  global.localStorage.token = res.data.token;
  global.localStorage.username = res.data.user.username;
  global.localStorage.userid = res.data.user.id;
}

export function getToken () {
  return global.localStorage.token;
}

export function authenticated () {
  return !!global.localStorage.token;
}

export function logout () {
  socket.emit('userDisconnected', {username: global.localStorage.username});
  delete global.localStorage.token;
  delete global.localStorage.username;
  delete global.localStorage.userid;
}
