import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeMessageText } from '../actions/message';
import socket from '../sync';

class Input extends React.Component {
  constructor (props) {
    super(props);
  }

  changeMessage (e) {
    this.props.dispatch(changeMessageText(e.target.name, e.target.value));
  }

  sendMessage (e) {
    e.preventDefault();
    let msg = document.getElementById('inputMessage');
    socket.emit('send message', {text: msg.value, username: global.localStorage.username});
    msg.value = '';
  }

  render () {
    return (
      <div className="inputMessageBox">
        <form onSubmit={this.sendMessage.bind(this)}>
          <textarea id="inputMessage" type="text" name="messageText" value={this.props.message} onChange={this.changeMessage.bind(this)} />
          <button className="btn btn-default">Send Text</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state.inputReducer;
export default connect(mapStateToProps)(withRouter(Input));
