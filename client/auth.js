import axios from 'axios';

export function signIn (username, password) {
  return axios.post('https://face-board.herokuapp.com/users/signin', {username, password}).then(res => {
    global.localStorage.token = res.data.token;
    global.localStorage.session = {
      username: res.data.user.userid,
      id: res.data.user.id
    }
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
  delete global.localStorage.session;
}

export function getUser () {
  return global.localStorage.session;
}