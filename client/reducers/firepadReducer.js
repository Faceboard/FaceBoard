import { FETCHING_FIREPAD, FIREPAD_FETCHED, FIREPAD_MODE, TOGGLE_DIV } from '../actions/action';

const initialState = {
  fetching: false,
  fetched: false,
  firepad: null,
  mode: 'javascript'
};

const firepadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FIREPAD:
      return {
        ...state,
        fetching: true
      };
    case FIREPAD_FETCHED:
      return {
        ...state,
        fetched: true,
        fetching: false
      };
    case FIREPAD_MODE:
      return {
        ...state,
        mode: action.mode
      };
    case TOGGLE_DIV:
      return {
        ...state,
        hidden: !action.hidden
      };
    default:
      return state;
  }
};

export default firepadReducer;
