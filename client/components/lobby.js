import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';
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
  }

  componentDidMount () {
    window.location.host = 'face-board.herokuapp.com';
  }

  onLogout () {
    logout();
    this.props.router.replace('/auth');
  }

  render () {
    let username = global.localStorage.username;
    return (
      <div className="lobby">
        <div className="mainHeader">
          Lobby
          <button className="btn btn-default pull-right" onClick={this.onLogout.bind(this)}>
            <span className="icon icon-logout"></span>
          </button>
        </div>
        <FriendsList />
        <Chat />
      </div>
    );
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Lobby));
