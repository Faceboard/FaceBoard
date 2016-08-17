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
  }

  render () {
    return (
      <div className="inputMessageBox">
        <form onSubmit={this.sendMessage.bind(this)}>
          <textarea class="inputMessage" type="text" name="messageText" >
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