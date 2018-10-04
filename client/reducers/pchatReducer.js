import { FETCHING_PCHAT, PCHAT_FETCHED, PCHAT_ERROR } from '../actions/action';

const initialState = {
  privMessages: [],
  fetching: false,
  fetched: false
};

const pchatReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_PCHAT:
      return {
        ...state,
        fetching: true
      };
    case PCHAT_FETCHED:
      return {
        ...state,
        fetched: false,
        fetching: true,
        privMessages: action.payload
      };
    case PCHAT_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      };
    default:
      return state;
  }
};

export default pchatReducer;
