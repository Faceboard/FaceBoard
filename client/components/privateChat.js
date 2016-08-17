import React from 'react';
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
    this.props.dispatch(getPrivateMessages(global.localStorage.seconduserid));
  }


  leaveSession () {
    delete window.inSession;
    socket.emit('leaveSession', global.localStorage.session);
    const { router } = this.props;
    router.replace('/');
  }

  render() {
    const { privMessages } = this.props;
    console.log('priv messages', privMessages);
    if (!privMessages) {
      return(
        <div>
          Loading...
        </div>
      )
    }

    if (privMessages) {
      return (
        <div className="lobby">
          <button onClick={ this.leaveSession.bind(this) }>Lobby</button>
          <FriendsList />
          <div className="chatBox">
            {privMessages.map(priv => <Message user={priv.useroneid} text={priv.text} />)}
          </div>
          <PrivateChatInput />
        </div>
      )
    }
  }
}

          // {messages.map(msg => <Message user={msg.useroneid} text={msg.text} key={msg.id} />)}


const mapStateToProps = (state) => state.pchatReducer;
export default connect(mapStateToProps)(withRouter(PrivateChat));





















