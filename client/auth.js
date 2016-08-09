import axios from 'axios';

export function signIn (username, password) {
  return axios.post('https://face-board.herokuapp.com/users/signin', {username, password}).then(res => {
    global.localStorage.token = res.data.token;
    console.log(global.localStorage.token);
  })
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
}
