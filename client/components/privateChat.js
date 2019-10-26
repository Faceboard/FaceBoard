import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPrivateMessages, rightClickPChat } from '../actions/chat';
import SideBar from './sidebar';
import socket from '../sync';
import PrivateChatInput from './privateChatInput';
import Message from './message';
import RoomSelect from './roomSelect';
import { ProgressCircle } from 'react-desktop/macOs';
import { removeHighlight, startPChat, findNewFriend, removePChatHighlighting } from '../helpers/friendHelpers';
import { makePChatMenu, reattachPChatMenu } from '../actions/menu';
import Users from './users';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const { router } = this.props;
    socket.emit('join pchat', {pchat: global.localStorage.pchat});
    this.props.dispatch(getPrivateMessages(global.localStorage.seconduserid));
    makePChatMenu(router);
  }

  componentDidMount () {
    removeHighlight(global.localStorage.secondusername);
    startPChat(global.localStorage.secondusername)
  }

  componentDidUpdate () {
    const { router } = this.props;
    var node = this.refs.privChat;
    this.shouldScroll = Math.abs((node.scrollTop + node.offsetHeight) - node.scrollHeight) < (node.scrollTop / 3);
    if (!this.firstScroll) {
      this.shouldScroll = true;
      this.firstScroll = true;
    }
    this.scrollToBottomAtStart();
    makePChatMenu(router);
    if (global.newName) {
      findNewFriend(global.newName);
    }
  }

  scrollToBottomAtStart () {
    if (this.shouldScroll) {
      var node = this.refs.privChat;
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
    if (!privMessages.length) {
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
            <div className="pull-right">
              <div className="users-search">
                <Users />
              </div>
            </div>
          </div>
          <SideBar />
            <div className="chat-container">
              <div className="chatBox" ref="privChat">
                <table className="table-striped">
                  <tbody>
                    {privMessages.map(priv => <Message user={priv.useronename} text={priv.text} timestamp={priv.createdAt}/>)}
                  </tbody>
                </table>
              </div>
              <PrivateChatInput />
            </div>
            <RoomSelect />
        </div>
      )
    }
  }
}

const { arrayOf, shape, string } = React.PropTypes;

PrivateChat.propTypes = {
  privMessages: arrayOf(shape({
    useronename: string.isRequired,
    text: string.isRequired,
    createdAt: string.isRequired
  }))
};

const mapStateToProps = (state) => state.pchatReducer;
export default connect(mapStateToProps)(withRouter(PrivateChat));
