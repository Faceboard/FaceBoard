import { FETCHING_USERS, USERS_FETCHED, FETCH_USERS_ERROR, CHANGE_FIELD } from '../actions/action';

const initialState = {
  users: [],
  fetching: false,
  fetched: false
};

// do constants
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return Object.assign({}, state, { fetching: true } );
    case USERS_FETCHED:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        users: action.payload
      });
    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    case CHANGE_FIELD:
      return Object.assign({}, state, {
        [action.field]: action.value
      });
    default:
      return state;
  }
};

export default userReducer;
