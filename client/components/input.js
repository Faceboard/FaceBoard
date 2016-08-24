import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeMessageText } from '../actions/message';
import socket from '../sync';
import { reattachChatMenus } from '../actions/menu';

class Input extends React.Component {
  constructor (props) {
    super(props);
  }

  sendMessage (e) {
    let msg = document.getElementById('inputMessage');
    socket.emit('send message', {text: msg.value, username: global.localStorage.username, userid: global.localStorage.userid });
    msg.value = '';
    reattachChatMenus();
  }

  sendMessageEnter (e) {
    if (e.which === 13 && !e.shiftKey || e.which === 2) {
      this.sendMessage(e);
    }
  }

  render () {
    return (
      <div className="inputMessageBox">
        <div className="inputMessage">
          <textarea id="inputMessage" type="text" name="messageText" onKeyPress={this.sendMessageEnter.bind(this)}/>
          <div className="inputMessageButton">
            <button className="btn btn-default" onClick={this.sendMessage.bind(this)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.inputReducer;
export default connect(mapStateToProps)(withRouter(Input));
