import axios from 'axios';
import { FETCHING_MESSAGES, FETCHING_PRIVATE_MESSAGES, MESSAGES_FETCHED, MESSAGES_ERROR, FETCHING_PCHAT, PCHAT_FETCHED, PCHAT_ERROR } from './action';
import { getAllFriends } from './friends';

export function getAllMessages () {
  return function (dispatch) {
    dispatch({type: FETCHING_MESSAGES });
    axios.get('https://face-board.herokuapp.com/messages/findAllMessages')
    .then( (response) => {
      dispatch({type: MESSAGES_FETCHED,
      payload: response.data });
    })
    .catch( (error) => {
      dispatch({
        type: MESSAGES_ERROR,
        error: error
      });
    });
  };
}

export function getPrivateMessages (usertwoid) {
  return function (dispatch) {
    dispatch({type: FETCHING_PCHAT });
    axios.post('https://face-board.herokuapp.com/messages/private/findAll', {usertwoid})
      .then((response) => {
        console.log('RESPONSE', response);
        dispatch({
          type: PCHAT_FETCHED,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({type: PCHAT_ERROR,
        error: error });
      });
  };
}

export function getAllFriendPrivateMsg (seconduserid) {
  return function (dispatch) {
    dispatch(getPrivateMessages(seconduserid));
    dispatch(getAllFriends());
  }
}
