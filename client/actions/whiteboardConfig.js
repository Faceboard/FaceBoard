import { FETCHING_WHITEBOARD, WHITEBOARD_FETCHED, WHITEBOARD_ERROR } from './action';
import axios from 'axios';
import socket from '../sync';

export function fetchWhiteboard (id) {
  return function (dispatch) {
    dispatch({type: FETCHING_WHITEBOARD });
    if (!id) {
      axios.post('https://www.twiddla.com/API/CreateMeeting.aspx?username=faceboard&password=faceboard')
      .then((response) => {
        socket.emit('sendWhiteboardID', {roomname: global.localStorage.roomname, id: response.data});
        dispatch({type: WHITEBOARD_FETCHED, payload: response.data });
        return response.data;
      })
      .catch((error) => {
        dispatch({type: WHITEBOARD_ERROR, error: error });
      });
    } else {
      dispatch({type: WHITEBOARD_FETCHED, payload: id});
    }
  };
}
