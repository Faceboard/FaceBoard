import { FETCHING_WHITEBOARD, WHITEBOARD_FETCHED, WHITEBOARD_ERROR } from '../actions/action';

const initialState = {
  fetching: false,
  fetched: false
};

const whiteboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_WHITEBOARD:
      return Object.assign({}, state, { fetching: true });
    case WHITEBOARD_FETCHED:
      return Object.assign({}, state, { fetched: true, fetching: false});
    default:
      return state;
  }
};

export default whiteboardReducer;