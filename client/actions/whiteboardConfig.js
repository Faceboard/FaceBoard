import { FETCHING_WHITEBOARD, WHITEBOARD_FETCHED, WHITEBOARD_ERROR } from './action';
import axios from 'axios';

export function fetchWhiteboard () {
  return function (dispatch) {
    dispatch({type: FETCHING_WHITEBOARD });
    axios.post('https://www.twiddla.com/API/CreateMeeting.aspx?username=faceboard&password=faceboard')
      .then((response) => {
        dispatch({type: WHITEBOARD_FETCHED, payload: response.data });
      })
      .catch((error) => {
        dispatch({type: WHITEBOARD_ERROR, error: error });
      });
  };
}
