import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { sendPrivateMessage } from '../helpers/pchatHelpers';

class privateInput extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage (e) {
    sendPrivateMessage();
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
          <textarea id="privateMessage" type="text" name="messageText" onKeyPress={this.sendMessageEnter.bind(this)}/>
        </div>
        <div className="inputMessageButton">
          <button className="btn btn-default" onClick={this.sendMessage.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}
// convert inputMessageBox to class in css
// convert inputMessage to class
const mapStateToProps = (state) => state.inputReducer;
export default connect(mapStateToProps)(withRouter(privateInput));
