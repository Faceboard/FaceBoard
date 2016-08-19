import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeMessageText } from '../actions/message';
import socket from '../sync';

class Input extends React.Component {
  constructor (props) {
    super(props);
  }

  sendMessage (e) {
    if (e.which === 13 && !e.shiftKey) {
      let msg = document.getElementById('inputMessage');
      socket.emit('send message', {text: msg.value, username: global.localStorage.username});
      msg.value = '';
    }
  }

  render () {
    return (
      <div className="inputMessageBox">
        <div className="inputMessage">
          <textarea id="inputMessage" type="text" name="messageText" onKeyPress={this.sendMessage.bind(this)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.inputReducer;
export default connect(mapStateToProps)(withRouter(Input));
