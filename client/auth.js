import axios from 'axios';

export function signIn (username, password) {
  return axios.post('https://face-board.herokuapp.com/user/signin', {username, password}).then(res => {
    global.localStorage.token = res.data.token;
  })
}

export function signUp (username, password) {
  return axios.post('https://face-board.herokuapp.com/user/signup', {username, password}).then(res => {
    global.localStorage.token = res.data.token;
  })
}
