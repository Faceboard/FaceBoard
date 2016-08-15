import axios from 'axios';

export function getAllFriends () {
  // still requires and authentication token
  return axios.get('https://face-board.herokuapp.com/friends/findAll');
}

export function addFriend (friendid, friendname) {
  return axios.post('https://face-board.herokuapp.com/friends/add', {
    friendid,
    friendname
  });
}