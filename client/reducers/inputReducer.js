import { CHANGE_MESSAGE_TEXT } from '../actions/action';

const inputReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_MESSAGE_TEXT:
      return {
        ...state,
        [action.field]: action.text
      };
    default:
      return state;
  }
};

export default inputReducer;
