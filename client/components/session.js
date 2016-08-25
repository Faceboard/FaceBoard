import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import VideoList from './videoList';
import MainSession from './mainSession';
import Sidebar from './sidebar';
import Firebase from 'firebase';
import Firepad from 'firepad';
import { configFirebase, fetchFirepad } from '../actions/firebaseConfig';
import socket from '../sync';
import { logout, authenticated } from '../auth';
import Users from './users';
const remote = window.require('electron').remote;


class Session extends React.Component {
  constructor (props) {
    super(props);
  }

  leaveSession () {
    delete window.inSession;
    socket.emit('leaveSession', global.localStorage.session);
    const { router } = this.props;
    router.replace('/');
    remote.getCurrentWindow().reload();
  }

  onLogout () {
    logout();
    this.leaveSession();
  }

  render () {
    return (
      <div id="sessionWrapper">
        <div className="mainHeader">
          Private
          <div className="pull-right">
            <div className="users-search">
              <Users />
            </div>
          </div>
          <button className="btn btn-default pull-right" onClick={this.leaveSession.bind(this)}>
            <span className="icon icon-home"></span>
          </button>
        </div>
        <Sidebar />
        <MainSession />
      </div>
    );
  }
}

// change this in time
const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(Session));
// places to rename sessionName: session.js, component,
