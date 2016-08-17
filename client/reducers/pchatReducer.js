import { FETCHING_PCHAT, PCHAT_FETCHED, PCHAT_ERROR } from '../actions/action';

const initialState = {
  privMessages: [],
  fetching: false,
  fetched: false
};

const pchatReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_PCHAT:
      return Object.assign({}, state, {
        fetching: true
      });
    case PCHAT_FETCHED:
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
        privMessages: action.payload
      });
    case PCHAT_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    default:
      return state;
  }
};

export default pchatReducer;
