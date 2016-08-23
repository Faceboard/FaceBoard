import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPrivateMessages, rightClickPChat } from '../actions/chat';
import FriendsList from './friendsList';
import socket from '../sync';
import PrivateChatInput from './privateChatInput';
import Message from './message';
import { ProgressCircle } from 'react-desktop/macOs';
import { removeHighlight, startPChat, findNewFriend, removePChatHighlighting } from '../helpers/friendHelpers';
import { makePChatMenu, reattachPChatMenu } from '../actions/menu';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    socket.emit('join pchat', {pchat: global.localStorage.pchat});
    this.props.dispatch(getPrivateMessages(global.localStorage.seconduserid));
    reattachPChatMenu();
  }

  componentWillUpdate () {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScroll = Math.abs((node.scrollTop + node.offsetHeight) - node.scrollHeight) < 3;
  }

  componentDidMount () {
    this.scrollToBottomAtStart();
    removeHighlight(global.localStorage.secondusername);
    startPChat(global.localStorage.secondusername)
  }

  componentDidUpdate () {
    this.scrollToBottomAtStart();
    makePChatMenu();
    if (global.newName) {
      findNewFriend(global.newName);
    }
  }

  scrollToBottomAtStart () {
    if (this.shouldScroll) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  leaveSession () {
    delete window.inSession;
    socket.emit('leaveSession', global.localStorage.session);
    const { router } = this.props;
    removePChatHighlighting();
    router.replace('/');
  }

  render() {
    const { privMessages } = this.props;
    if (!privMessages) {
      return(
        <div className="progresscircle">
          <ProgressCircle size={40}/>
        </div>
      )
    }

    if (privMessages) {
      let headerString = global.localStorage.username + "'s chat session with " + global.localStorage.secondusername;
      return (
        <div className="lobby">
          <div className="mainHeader">
            {'Private Chat - ' + global.localStorage.secondusername}
            <button className="btn btn-default pull-right" onClick={this.leaveSession.bind(this)}>
              <span className="icon icon-home"></span>
            </button>
          </div>
          <FriendsList />
            <div className="chatBox">
              <table className="table-striped">
                <tbody>
                  {privMessages.map(priv => <Message user={priv.useronename} text={priv.text} timestamp={priv.createdAt}/>)}
                </tbody>
              </table>
              <PrivateChatInput />
            </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => state.pchatReducer;
export default connect(mapStateToProps)(withRouter(PrivateChat));
