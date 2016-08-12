import axios from 'axios';

export function signIn (username, password) {
  return axios.post('https://face-board.herokuapp.com/users/signin', {username, password}).then(res => {
    global.localStorage.token = res.data.token;
    global.localStorage.username = res.data.user.userid;
    global.localStorage.userid = res.data.user.id;
  });
}

export function signUp (username, password) {
  return axios.post('https://face-board.herokuapp.com/users/signup', {username, password});
}

export function getToken () {
  return global.localStorage.token;
}

export function authenticated () {
  return !!global.localStorage.token;
}

export function logout () {
  delete global.localStorage.token;
  delete global.localStorage.username;
  delete global.localStorage.userid;
}
