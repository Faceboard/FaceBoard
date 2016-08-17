import axios from 'axios';
import { FETCHING_FRIENDS, FRIENDS_FETCHED, FETCHING_FRIENDS_ERROR } from './action';

// export function getAllFriends () {
//   // still requires and authentication token
//   return axios.get('https://face-board.herokuapp.com/friends/findAll');
// };

// export function addFriend (friendid, friendname) {
//   return axios.post('https://face-board.herokuapp.com/friends/add', {
//     friendid,
//     friendname
//   });
// };


export function getAllFriends () {
  return function (dispatch) {
    dispatch({type: FETCHING_FRIENDS });
    console.log('GETTING FRIENDS RIGHT HERE');
    axios.get('https://face-board.herokuapp.com/friends/findAll')
      .then((response) => {
        dispatch({type: FRIENDS_FETCHED, payload: response.data });
      })
      .catch((error) => {
        dispatch({type: FETCHING_FRIENDS_ERROR, error: error });
      });
  };
}

export function addFriend (friendid, friendname) {
  return function (dispatch) {
    dispatch({type: FETCHING_FRIENDS});
    axios.post('https://face-board.herokuapp.com/friends/add', {
      friendid,
      friendname
    })
    .catch((error) => {
      dispatch({
        type: FETCHING_FRIENDS_ERROR,
        payload: error
      });
    });
  }
}
