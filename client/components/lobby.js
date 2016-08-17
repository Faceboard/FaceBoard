import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';
import FriendsList from './friendsList';
import Chat from './chat';
import Input from './input';
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
        <div className="toolbar toolbar-header">
          <button className="btn btn-default">
            <span className="icon icon-home"></span>
          </button>
          <button className="btn btn-default btn-dropdown pull-right" onClick={this.onLogout.bind(this)} alt="Logout">
            <span className="icon icon-megaphone"></span>
          </button>
        </div>
        <div className="mainHeader">Hello World</div>
        <FriendsList />
        <Chat />
        <Input />
      </div>
    );
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Lobby));
