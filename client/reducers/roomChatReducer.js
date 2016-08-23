import { FETCHING_ROOM_MESSAGES, ROOM_MESSAGES_FETCHED, ROOM_MESSAGES_ERROR } from '../actions/action';

const initialState = {
  messages: [],
  fetching: false,
  fetched: false
};

const roomChatReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_ROOM_MESSAGES:
      return Object.assign({}, state, {
        fetching: true
      });
    case ROOM_MESSAGES_FETCHED:
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
        privMessages: action.payload
      });
    case ROOM_MESSAGES_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    default:
      return state;
  }
};

export default roomChatReducer;