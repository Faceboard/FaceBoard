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
      <div id="inputMessageBox">
        <form onSubmit={this.sendMessage.bind(this)}>
          <textarea id="inputMessage" type="text" name="messageText" value={this.props.message} onChange={this.changeMessage.bind(this)}>
          </textarea>
          <button> Send Text </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state.inputReducer;
export default connect(mapStateToProps)(withRouter(Input));