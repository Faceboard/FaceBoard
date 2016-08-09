import axios from 'axios';

export function getAllUsers() {
  return function(dispatch) {
    dispatch({type: FETCHING_USERS})
    axis.get('https://face-board.herokuapp.com/users/findall')
      .then((response) => {
        dispatch({type: 'USERS_FETCHED', payload: response.data });
      })
      .catch((error) => {
        dispatch({type: 'FETCHING_USERS_ERROR', error: error });
      })
  }
}
