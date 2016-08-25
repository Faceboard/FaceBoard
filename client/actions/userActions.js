import { FETCHING_USERS, USERS_FETCHED, FETCH_USERS_ERROR, CHOOSE_USER } from './action';
import axios from 'axios';
import { constantUrl } from '../sync';


export function getAllUsers () {
  return function (dispatch) {
    dispatch({type: FETCHING_USERS });
    axios.get(constantUrl + '/users/findall')
      .then((response) => {
        dispatch({type: USERS_FETCHED, payload: response.data });
      })
      .catch((error) => {
        dispatch({type: FETCH_USERS_ERROR, error: error });
      });
  };
}

export function filterSearch (filter) {
  return {
    type: 'FILTER_USERS',
    filter
  };
};


export function showUserSelect () {
  let userSelect = document.getElementsByClassName('user-select')[0];
  userSelect.classList.remove('no-show');
}

export function hideUserSelect () {
  let userSelect = document.getElementsByClassName('user-select')[0];
  userSelect.classList.add('no-show');
}

export function chooseUser (user) {
  return {
    type: CHOOSE_USER,
    chosenUser: user
  };
};