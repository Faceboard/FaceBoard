const collabModal = (state = {}, action) => {
  switch (action.type) {

    case 'CHANGE_FIELD':
      return Object.assign({}, state, {
        [action.field]: action.value
      });

    default:
      return state;
  }
};

export default collabModal;
