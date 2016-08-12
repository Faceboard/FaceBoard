import React from 'react';
import ReactDOM from 'react-dom';
import { getAllMessages } from '../actions/chat';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Message from './message';
import socket from '../sync';

class Chat extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllMessages());
  }

  componentWillUpdate () {
    var node = ReactDOM.findDOMNode(this);
    console.log(node.scrollTop + node.offsetHeight);
    console.log(node.scrollHeight);
    this.shouldScroll = Math.abs((node.scrollTop + node.offsetHeight) - node.scrollHeight) < 3;
  }

  componentDidUpdate () {
    if (this.shouldScroll) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render () {
    const { messages } = this.props;
    if (!messages) {
      return (
        <div className="loading">
          Loading...
        </div>
      );
    }
    return (
      <div id="chatBox">
        {messages.map(message => <Message key={message.id} user={message.user} text={message.text} />)}
      </div>
    );
  }
}

const mapStateToProps = state => state.chatReducer;
export default connect(mapStateToProps)(withRouter(Chat))