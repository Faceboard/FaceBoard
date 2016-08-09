
const initialState = {
  users: [],
  fetching: false,
  fetched: false
}
// do constants
const userReducer = (state=initialState, action) {
  switch (action.type) {
    case FETCHING_USERS:
      return {...state, fetching: true };
    case USERS_FETCHED:
      return {
        ...state,
        fetching: false,
        fetched: true
        users: action.payload
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      }
  }

}