const initialState = {
  fetching: false,
  fetched: false
}

const firepadReducer = (state = {}, action) => {
  switch(action.type) {
    case 'FETCHING_FIREPAD':
      return Object.assign({}, state, { fetching: true });
    case 'FIREPAD_FETCHED':
      return Object.assign({}, state, { fetched: true, fetching: false});
    default:
      return state;
  }
};

export default firepadReducer;