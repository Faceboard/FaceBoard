import React from 'react';
import ReactDOM from 'react-dom';
import { getAllMessages } from '../actions/chat';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeChatMenu } from '../actions/menu';
import Message from './message';
import Input from './input';
import socket from '../sync';
import { ProgressCircle } from 'react-desktop/macOs';

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
    makeChatMenu();
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
<<<<<<< d0ee4363e5e1e4c8d7d7523de21485c0df636d52
        <div className="progresscircle">
          <ProgressCircle size={40}/>
=======
        <div className="loading">
          <spinner></spinner>
>>>>>>> (feat) add spinner for when messages are loading and build skeleton for chat menu
        </div>
      );
    }
    return (
      <div className="chatBox">
        <table className="table-striped">
          <tbody>
            {messages.map(message => <Message key={message.id} userid={message.userid} user={message.user} text={message.text} timestamp={message.createdAt}/>)}
          </tbody>
        </table>
        <Input />
      </div>
    );
  }
}

const mapStateToProps = state => state.chatReducer;
export default connect(mapStateToProps)(withRouter(Chat))
