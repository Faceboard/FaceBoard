import { FETCHING_USERS, USERS_FETCHED, FETCH_USERS_ERROR } from './action';
import axios from 'axios';


export function getAllUsers () {
  return function (dispatch) {
    dispatch({type: FETCHING_USERS });
    axios.get('https://face-board.herokuapp.com/users/findall')
      .then((response) => {
        dispatch({type: USERS_FETCHED, payload: response.data });
      })
      .catch((error) => {
        dispatch({type: FETCH_USERS_ERROR, error: error });
      });
  };
}
