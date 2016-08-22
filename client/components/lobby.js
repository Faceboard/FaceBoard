import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';
import { getAllUsers, filterSearch } from '../actions/userActions';
import { makePrivateSession } from '../actions/session';
import { startPChatFromAllUsers } from '../actions/chat';
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

  componentDidMount () {

  }

  onLogout () {
    logout();
    this.props.router.replace('/auth');
  }

  showAllUsers () {

  }

  callUser (e) {
    e.preventDefault();
    makePrivateSession(global.localStorage.username, e.target.getAttribute('value'));
  }

  msgUser (e) {
    const { router } = this.props;
    e.preventDefault();
    startPChatFromAllUsers(e, router);
  }

  filterUsers (e) {
    this.props.dispatch(filterSearch(e.target.value));
  }

  render () {
    const { filteredUsers } = this.props.userReducer;
    const mapUsers = filteredUsers.map(user =>
      <li  className=" list-group-item" key={user.username}>
        <button onClick={this.callUser.bind(this)}>
          <span className="icon icon-phone" value={user.username}></span>
        </button>
        <button onClick={this.msgUser.bind(this)}>
          <span className="icon icon-pencil" data-username={user.username} data-user-id={user.id}></span>
        </button>
        <div className="media-body pull-right">
          <strong>{user.username}</strong>
        </div>
      </li>
    );
    console.log('map users', mapUsers);
    if (!filteredUsers) {
      return (
        <div> Loading... </div>
      )
    }
    return (
      <div className="lobby">
        <div className="mainHeader">
          Lobby
          <button className="btn btn-default pull-right" onClick={this.onLogout.bind(this)}>
            <span className="icon icon-logout"></span>
          </button>
          <button className="btn btn-default pull-right" onClick={this.showAllUsers.bind(this)}>
            <span className="icon icon-search"></span>
          </button>
          <ul className="list-group pull-right">
            <li className="list-group-header">
              <input className="form-control" type="text" placeholder="Search for someone" value={this.props.value} onChange={this.filterUsers.bind(this)}/>
            </li>
            {mapUsers}
          </ul>
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
