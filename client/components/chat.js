import React from 'react';
import ReactDOM from 'react-dom';
import { getAllMessages } from '../actions/chat';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeChatMenu } from '../actions/menu';
import Message from './message';
import RoomSelect from './roomSelect';
import Input from './input';
import socket from '../sync';
import { ProgressCircle } from 'react-desktop/macOs';

class Chat extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const { router } = this.props;
    this.props.dispatch(getAllMessages());
    makeChatMenu(router);
  }

  componentDidUpdate () {
    const { router } = this.props;
    const node = this.refs.chat;
    this.shouldScroll = Math.abs((node.scrollTop + node.offsetHeight) - node.scrollHeight) < (node.scrollTop);
    if (!this.firstScroll) {
      this.shouldScroll = true;
      this.firstScroll = true;
    }
    this.scrollToBottomAtStart();
    makeChatMenu(router);
  }

  scrollToBottomAtStart () {
    if (this.shouldScroll) {
      const node = this.refs.chat;
      node.scrollTop = node.scrollHeight;
    }
  }

  render () {
    const { messages } = this.props;
    if (!messages) {
      return (
        <div className="progresscircle">
          <ProgressCircle size={40}/>
        </div>
      );
    }
    return (
      <div className="chat-container">
        <div className="chatBox" ref="chat">
          <table className="table-striped">
            <tbody>
              {messages.map(message => <Message key={message.id} userid={message.userid} user={message.user} text={message.text} timestamp={message.createdAt}/>)}
            </tbody>
          </table>
        </div>
        <Input />
        <RoomSelect />
      </div>
    );
  }
}

const { arrayOf, shape, string, number } = React.PropTypes;

Chat.propTypes = {
  messages: arrayOf(shape({
    id: number.isRequired,
    userid: number.isRequired,
    user: string.isRequired,
    text: string.isRequired
  }))
};

const mapStateToProps = state => state.chatReducer;
export default connect(mapStateToProps)(withRouter(Chat))
