import React from 'react';
import socket from '../sync';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { sendRoomMessage } from '../helpers/roomChatHelpers';

class roomInput extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage(e) {
    sendRoomMessage();
    document.getElementById('roomMessage').value = '';
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
          <textarea id="roomMessage" type="text" name="messageText" onKeyPress={this.sendMessageEnter.bind(this)}/>
          <div className="inputMessageButton">
            <button className="btn btn-default" onClick={this.sendMessage.bind(this)}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.inputReducer;
export default connect(mapStateToProps)(withRouter(roomInput));
