import axios from 'axios';

export function getAllMessages() {
  return function (dispatch) {
    dispatch({type: 'FETCHING_MESSAGES'});
    axios.get('https://face-board.herokuapp.com/messages/findAllMessages')
    // axios.get('http://localhost:3000/messages/findAllMessages')
    .then( (response) => {
      dispatch({type: 'MESSAGES_FETCHED',
      payload: response.data });
    })
    .catch( (error) => {
      dispatch({type: 'MESSAGES_ERROR',
      error: error });
    });
  };
}
