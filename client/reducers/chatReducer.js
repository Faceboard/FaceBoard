const initialState = {
  messages: [],
  fetching: false,
  fetched: false
};

const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_MESSAGES':
      return Object.assign({}, state, {
        fetching: true
      });
    case 'MESSAGES_FETCHED':
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
        messages: action.payload
      });
    case 'MESSAGES_ERROR':
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    default:
      return state;
  }
};

export default chatReducer;
