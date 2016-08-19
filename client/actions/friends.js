import axios from 'axios';
import { FETCHING_FRIENDS, FRIENDS_FETCHED, FETCHING_FRIENDS_ERROR } from './action';
import { constantUrl } from '../sync';

export function getAllFriends () {
  return function (dispatch) {
    dispatch({type: FETCHING_FRIENDS });
    axios.get(constantUrl + '/friends/findAll')
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
    console.log('addFriend fired');
    dispatch({type: FETCHING_FRIENDS});
    axios.post(constantUrl + '/friends/add', {
      friendid,
      friendname
    })
    .then((response) => {
      console.log(response);
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
