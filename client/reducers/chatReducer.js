import { FETCHING_MESSAGES, MESSAGES_FETCHED, MESSAGES_ERROR } from '../actions/action';

const initialState = {
  messages: [],
  fetching: false,
  fetched: false
};

const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_MESSAGES:
      return {
        ...state,
        fetching: true
      };
    case MESSAGES_FETCHED:
      return {
        ...state,
        fetched: false,
        fetching: true,
        messages: action.payload
      };
    case MESSAGES_ERROR:
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

export default chatReducer;
