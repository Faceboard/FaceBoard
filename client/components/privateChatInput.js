import React from 'react';
import socket from '../sync';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { sendPrivateMessage } from '../helpers/pchatHelpers';

class privateInput extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage(e) {
    if (e.which === 13 && !e.shiftKey) {
      sendPrivateMessage();
    }
  }

  render () {
    return (
      <div className="inputMessageBox">
        <div className="inputMessage">
          <textarea id="privateMessage" type="text" name="messageText" onKeyPress={this.sendMessage.bind(this)}/>
        </div>
      </div>
    )
  }
}
// convert inputMessageBox to class in css
// convert inputMessage to class
const mapStateToProps = (state) => state.inputReducer;
export default connect(mapStateToProps)(withRouter(privateInput));