import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPrivateMessages } from '../actions/chat';
import FriendsList from './friendsList';
import socket from '../sync';
import PrivateChatInput from './privateChatInput';
import Message from './message';

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    socket.emit('join pchat', {pchat: global.localStorage.pchat});
    this.props.dispatch(getPrivateMessages(global.localStorage.seconduserid));
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

  leaveSession () {
    delete window.inSession;
    socket.emit('leaveSession', global.localStorage.session);
    const { router } = this.props;
    router.replace('/');
  }

  render() {
    const { privMessages } = this.props;
    if (!privMessages) {
      return(
        <div>
          Loading...
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
              <span className="icon icon-logout"></span>
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
