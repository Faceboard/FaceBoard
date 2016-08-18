import React from 'react';
import ReactDOM from 'react-dom';
import { getAllMessages } from '../actions/chat';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Message from './message';
import Input from './input';
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
    this.shouldScroll = Math.abs((node.scrollTop + node.offsetHeight) - node.scrollHeight) < 3;
  }

  componentDidMount () {
    this.scrollToBottomAtStart();
  }

  componentDidUpdate () {
    this.scrollToBottomAtStart();
  }

  scrollToBottomAtStart () {
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
      <div className="chatBox">
        <table className="table-striped">
          <tbody>
            {messages.map(message => <Message key={message.id} user={message.user} text={message.text} timestamp={message.createdAt}/>)}
          </tbody>
        </table>
        <Input />
      </div>
    );
  }
}

const mapStateToProps = state => state.chatReducer;
export default connect(mapStateToProps)(withRouter(Chat))
