import { FETCHING_ROOMS, FETCHED_ROOMS, FETCHED_ROOMS_ERROR } = '../actions/action';

const initialState = {
  rooms: [],
  fetching: false,
  fetched: false
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
  }
};

export default roomReducer;