import React from 'react';
import { changeMessageText } from '../actions/message';
import socket from '../sync';
import { withRouter } from 'react-redux';

class privateInput extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage(e) {
    e.preventDefault();
    socket.emit('send private message', )
  }

  render () {
    return (

    )
  }
}

const mapStateToProps = state => state.inputReducer;
export default connect(mapStateToProps)(withRouter(Input));