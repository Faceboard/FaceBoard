import axios from 'axios';
import { constantURL } from '../sync';
import { FETCHING_ROOM_MESSAGES, ROOM_MESSAGES_FETCHED, ROOM_MESSAGES_ERROR } from './action';

export function getRoomMessages (roomid) {
  return function(dispatch) {
    dispatch({ type: FETCHING_ROOM_MESSAGES });
    axios.post(constantURL + '/messages/rooms/findAll', {roomid})
      .then((response) => {
        dispatch({type: ROOM_MESSAGES_FETCHED}),
        payload: response.data;
      })
      .catch((error) => {
        dispatch({type: ROOM_MESSAGES_ERROR}),
        payload: error
      });
  };
};
