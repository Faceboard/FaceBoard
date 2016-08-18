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
    let msg = document.getElementById('privateMessage');
    let msgObj = {
      text: msg.value,
      useroneid: global.localStorage.userid,
      usertwoid: global.localStorage.seconduserid,
      useronename: global.localStorage.username,
      usertwoname: global.localStorage.secondusername,
      chatRoom: global.localStorage.pchat
    };
    socket.emit('send private message', msgObj);
    console.log('SEND MESSAGE');
    msg.value = '';
  }

  render () {
    return (
      <div className="inputMessageBox">
        <form onSubmit={this.sendMessage.bind(this)}>
          <div className="inputMessage">
            <textarea id="privateMessage" type="text" name="messageText" />
          </div>
          <div className="inputMessageButton">
            <button className="btn btn-default">Send Text</button>
          </div>
        </form>
      </div>
    )
  }
}
// convert inputMessageBox to class in css
// convert inputMessage to class
const mapStateToProps = (state) => state.inputReducer;
export default connect(mapStateToProps)(withRouter(privateInput));
