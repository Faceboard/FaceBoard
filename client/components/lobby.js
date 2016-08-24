import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';
import { getAllUsers, filterSearch } from '../actions/userActions';
import { makePrivateSession } from '../actions/session';
import { startPChatFromAllUsers } from '../actions/chat';
import Sidebar from './sidebar';
import Users from './users';
import Chat from './chat';
import RoomList from './roomList';
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

  onLogout () {
    logout();
    this.props.router.replace('/auth');
  }

  render () {
    return (
      <div className="lobby">
        <div className="mainHeader">
          Lobby
          <button className="btn btn-default pull-right" onClick={this.onLogout.bind(this)}>
            <span className="icon icon-logout"></span>
          </button>
          <div className="pull-right">
            <div className="users-search">
              <Users />
            </div>
          </div>
        </div>
        <Sidebar />
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
