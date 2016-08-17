import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import VideoList from './videoList';
import MainSession from './mainSession';
import FriendsList from './friendsList';
import Firebase from 'firebase';
import Firepad from 'firepad';
import { configFirebase, fetchFirepad } from '../actions/firebaseConfig';
import socket from '../sync';
const remote = window.require('electron').remote;

class Session extends React.Component {
  constructor (props) {
    super(props);
  }

  leaveSession () {
    const { router } = this.props;
    delete window.inSession;
    phone.hangup();
    socket.emit('leaveSession', global.localStorage.session);
    router.replace('/');
    remote.getCurrentWindow().reload();
  }

  render () {
    return (
      <div id="sessionWrapper">
        <button onClick={ this.leaveSession.bind(this) }>Lobby</button>
        <h2>Session Place</h2>
        <FriendsList />
        <MainSession />
        <VideoList />
      </div>
    );
  }
}

// change this in time
const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(Session));
// places to rename sessionName: session.js, component,
