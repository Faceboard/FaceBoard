import axios from 'axios';
import { FETCHING_FRIENDS, FRIENDS_FETCHED, FETCHING_FRIENDS_ERROR } from './action';

export function getAllFriends () {
  return function (dispatch) {
    dispatch({type: FETCHING_FRIENDS });
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
    .then((response) => {
      dispatch(getAllFriends());
    })
    .catch((error) => {
      dispatch({
        type: FETCHING_FRIENDS_ERROR,
        payload: error
      });
    });
  }
}
