import { FETCHING_WHITEBOARD, WHITEBOARD_FETCHED, WHITEBOARD_ERROR } from '../actions/action';

const initialState = {
  whiteboardId: null,
  fetching: false,
  fetched: false
};

const whiteboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_WHITEBOARD:
      return {
        ...state,
        fetching: true
      }
    case WHITEBOARD_FETCHED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        whiteboardId: action.payload
      };
    case WHITEBOARD_ERROR:
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

export default whiteboardReducer;
