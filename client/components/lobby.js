import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';
import FriendsList from './friendsList';
import Chat from './chat';
import Input from './input';
import io from 'socket.io-client';
import socket from '../sync';
// import remote from 'electron';

class Lobby extends React.Component {
  constructor (props) {
    super(props);

    socket.on('userHasJoinedSession', function (mes) {
      const { router } = props;
      router.replace('/session');
    });
  }

  componentWillMount () {
    io.connect('https://face-board.herokuapp.com');
    if (!authenticated()) {
      this.props.router.replace('/auth');
    }
  }

  onLogout () {
    logout();
    this.props.router.replace('/auth');
  }

  render () {
    return (
      <div id="lobby">
        <h1>Hello World</h1>
        <FriendsList />
        <button id="logout" onClick={this.onLogout.bind(this)}>Logout</button>
        <Chat />
        <Input />
      </div>
    );
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Lobby));
