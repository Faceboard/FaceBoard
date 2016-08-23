import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';
import { getAllUsers, filterSearch } from '../actions/userActions';
import { makePrivateSession } from '../actions/session';
import { startPChatFromAllUsers } from '../actions/chat';
import HeaderIcons from './headerIcons';

import FriendsList from './friendsList';
import Chat from './chat';
import io from 'socket.io-client';
import socket from '../sync';

class Lobby extends React.Component {
  constructor (props) {
    super(props);

    socket.on('userHasJoinedSession', function (mes) {
      props.router.replace('/session');
    });
  }

  componentWillMount () {
    if (!authenticated()) {
      this.props.router.replace('/auth');
    }
    this.props.dispatch(getAllUsers());
  }

  render () {
    return (
      <div className="lobby">
        <div className="mainHeader">
          Lobby
          <HeaderIcons />
        </div>
        <FriendsList />
        <Chat />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer
  }
};

export default connect(mapStateToProps)(withRouter(Lobby));


// <button onClick={this.callUser.bind(this)}>
//           <span className="icon icon-phone" value={user.username}></span>
//         </button>
//         <button onClick={this.msgUser.bind(this)}>
//           <span className="icon icon-pencil" data-username={user.username} data-user-id={user.id}></span>
//         </button>
