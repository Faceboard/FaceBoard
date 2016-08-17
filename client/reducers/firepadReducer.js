import { FETCHING_FIREPAD, FIREPAD_FETCHED, FIREPAD_MODE, TOGGLE_DIV } from '../actions/action';

const initialState = {
  fetching: false,
  fetched: false,
  firepad: null,
  mode: 'javascript',
  hidden: false
};

const firepadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FIREPAD:
      return Object.assign({}, state, { fetching: true });
    case FIREPAD_FETCHED:
      return Object.assign({}, state, { fetched: true, fetching: false});
    case FIREPAD_MODE:
      return Object.assign({}, state, { mode: action.mode });
    case TOGGLE_DIV:
      return Object.assign({}, state, { hidden: true });
    default:
      return state;
  }
};

export default firepadReducer;
