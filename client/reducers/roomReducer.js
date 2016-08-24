import { FETCHING_ROOMS, FETCHED_ROOMS, FETCHED_ROOMS_ERROR, CHOOSE_ROOM } from '../actions/action';

const initialState = {
  rooms: [],
  fetching: false,
  fetched: false,
  chosenRoom: ''
};

const roomReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_ROOMS:
      return Object.assign({}, state, {fetching: true} );
    case FETCHED_ROOMS:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        rooms: action.payload
      });
    case FETCHED_ROOMS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    case CHOOSE_ROOM:
      return Object.assign({}, state, {
        chosenRoom: action.chosenRoom
      });

    default:
      return state;
  }
};

export default roomReducer;