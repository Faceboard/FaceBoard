import { FETCHING_ROOM_MESSAGES, ROOM_MESSAGES_FETCHED, ROOM_MESSAGES_ERROR } from '../actions/action';

const initialState = {
  roomMsgs: [],
  fetching: false,
  fetched: false
};

const roomChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ROOM_MESSAGES:
      return {
        ...state,
        fetching: true
      };
    case ROOM_MESSAGES_FETCHED:
      return {
        ...state,
        fetched: false,
        fetching: true,
        roomMsgs: action.payload
      };
    case ROOM_MESSAGES_ERROR:
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

export default roomChatReducer;
