import { FETCHING_WHITEBOARD, WHITEBOARD_FETCHED, WHITEBOARD_ERROR } from './action';
import axios from 'axios';

export function getWhiteboard () {
  return function (dispatch) {
    dispatch({type: FETCHING_WHITEBOARD });
    axios.post('https://www.twiddla.com/API/ListActive.aspx?username=face-board&password=face-board')
      .then((response) => {
        console.log(response);
        dispatch({type: WHITEBOARD_FETCHED, payload: response });
      })
      .catch((error) => {
        dispatch({type: WHITEBOARD_ERROR, error: error });
      });
  };
}
