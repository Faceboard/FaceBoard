import { FETCHING_USERS, USERS_FETCHED, FETCH_USERS_ERROR, CHANGE_FIELD, FETCHING_FRIENDS, FRIENDS_FETCHED, FETCHING_FRIENDS_ERROR, FILTER_USERS } from '../actions/action';

const initialState = {
  users: [],
  friends: [],
  filteredUsers: [],
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
        users: action.payload,
        filteredUsers: action.payload
      });
    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    case FETCHING_FRIENDS:
      return Object.assign({}, state, {fetching: true});
    case FRIENDS_FETCHED:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        friends: action.payload
      });
    case FETCHING_FRIENDS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    case CHANGE_FIELD:
      return Object.assign({}, state, {
        [action.field]: action.value
      });
    case FILTER_USERS:
      let filtered = state.users.filter(u => u.username.toLowerCase().indexOf(action.filter.toLowerCase()) !== -1);
      return Object.assign({}, state, { filteredUsers: filtered });
    default:
      return state;
  }
};

export default userReducer;
