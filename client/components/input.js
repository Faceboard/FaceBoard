import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeMessageText } from '../actions/message';
import socket from '../sync'

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  changeMessage(e) {
    this.props.dispatch(changeMessageText(e.target.name, e.target.value));
  }

  sendMessage(e) {
    e.preventDefault();
    const { message } = this.props;
    console.log('submitted', e);
    socket.emit('make message', { text: message, username: global.localStorage.username });
  }

  render() {
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
