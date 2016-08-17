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
    this.props.dispatch(getPrivateMessages(global.localStorage.userid, global.localStorage.secondpersonid));
  }


  leaveSession () {
    delete window.inSession;
    socket.emit('leaveSession', global.localStorage.session);
    const { router } = this.props;
    router.replace('/');
  }

  render() {
    console.log(messages);
    const { messages } = this.props;

    return (
      <div className="lobby">
        <button onClick={ this.leaveSession.bind(this) }>Lobby</button>
        <FriendsList />
        <div className="chatBox">
        </div>
        <PrivateChatInput />
      </div>
    )
  }
}

          // {messages.map(msg => <Message user={msg.useroneid} text={msg.text} key={msg.id} />)}


const mapStateToProps = (state) => state.chatReducer;
export default connect(mapStateToProps)(withRouter(PrivateChat));





















