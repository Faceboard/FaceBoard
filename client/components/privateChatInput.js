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
    let msg = document.getElementById('privateMessage').value;
    let messageObj = {
      chatRoom: global.localStorage.pchat,
      useroneid: global.localStorage.userid,
      usertwoid: global.localStorage.seconduserid,
      text: msg
    };
    socket.emit('send private message', messageObj);
  }

  render () {
    return (
      <div id="inputMessageBox">
        <form onSubmit={this.sendMessage.bind(this)}>
          <textarea id="privateMessage" type="text" name="messageText" value={this.props.message}>
          </textarea>
          <button> Send Text </button>
          </form>
        </div>
    )
  }
}

const mapStateToProps = state => state.inputReducer;
export default connect(mapStateToProps)(withRouter(Input));