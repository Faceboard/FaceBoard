const inputReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_MESSAGE_TEXT':
      return Object.assign({}, state, {[action.field]: action.text});
    default:
      return state;
  }
};

export default inputReducer;
