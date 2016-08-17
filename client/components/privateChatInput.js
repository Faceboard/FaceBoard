import React from 'react';
import socket from '../sync';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class privateInput extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage(e) {
    e.preventDefault();
    let msg = document.getElementById('privateMessage').value;
    let msgObj = {
      text: msg,
      useroneid: global.localStorage.userid,
      usertwoid: global.localStorage.seconduserid,
      chatRoom: global.localStorage.pchat
    };
    socket.emit('send private message', msgObj);
  }

  render () {
    return (
      <div className="inputMessageBox">
        <form onSubmit={this.sendMessage.bind(this)}>
          <textarea id="privateMessage" type="text" name="messageText" >
          </textarea>
          <button> Send Text </button>
        </form>
      </div>
    )
  }
}
// convert inputMessageBox to class in css
// convert inputMessage to class
const mapStateToProps = (state) => state.inputReducer;
export default connect(mapStateToProps)(withRouter(privateInput));
