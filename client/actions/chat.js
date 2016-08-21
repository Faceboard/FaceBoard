import axios from 'axios';
import { FETCHING_MESSAGES, FETCHING_PRIVATE_MESSAGES, MESSAGES_FETCHED, MESSAGES_ERROR, FETCHING_PCHAT, PCHAT_FETCHED, PCHAT_ERROR } from './action';
import { getAllFriends } from './friends';
import { constantUrl } from '../sync';
import socket from '../sync';
import { store } from '../index';
import { removeHighlight, startPChat } from '../helpers/friendHelpers';

export function getAllMessages () {
  return function (dispatch) {
    dispatch({type: FETCHING_MESSAGES });
    axios.get(constantUrl + '/messages/findAllMessages')
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
    axios.post(constantUrl + '/messages/private/findAll', {usertwoid})
      .then((response) => {
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

export function pChatStart (event, router) {
  global.localStorage.seconduserid = event.target.value;
  global.localStorage.secondusername = event.target.innerHTML;
  global.localStorage.pchat = global.localStorage.username + global.localStorage.seconduserid;
  let data = {
    pchat: global.localStorage.pchat,
    seconduserid: global.localStorage.seconduserid,
    secondusername: global.localStorage.secondusername
  }
  socket.emit('makePrivateChat', data);
  router.replace('/privateChat');
  store.dispatch(getAllFriendPrivateMsg(data.seconduserid));
  removeHighlight(event.target.innerHTML);
  startPChat(event.target.innerHTML)
}