import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../auth';
import { getAllUsers, filterSearch } from '../actions/userActions';
import { makePrivateSession } from '../actions/session';
import { startPChatFromAllUsers } from '../actions/chat';
import { addFriend } from '../actions/friends';
import socket from '../sync';

class Users extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllUsers());
  }

  onLogout () {
    logout();
    this.props.router.replace('/auth');
  }

  callUser (e) {
    e.preventDefault();
    makePrivateSession(global.localStorage.username, e.target.dataset['username']);
  }

  msgUser (e) {
    const { router } = this.props;
    e.preventDefault();
    startPChatFromAllUsers(e, router);
  }

  addUser (e) {
    this.props.dispatch(addFriend(e.target.dataset['userId'], e.target.dataset['username']));
  }

  filterUsers (e) {
    this.props.dispatch(filterSearch(e.target.value));
  }

  inviteToRoom (e) {
    let roomInvObj = {
      roomname: global.localStorage.currentRoom,
      secondusername: e.target.dataset['username'],
      firstusername: global.localStorage.username
    };
    socket.emit('send room invite', roomInvObj);
  }

  showUserMenu () {
    this.refs.users.classList.toggle('users-color');
  }

  hideUserMenu (e) {
    this.refs.users.classList.toggle('users-color');
    this.props.dispatch(filterSearch(''));
  }

  alt (user) {
    this.refs["user" + user.username].classList.toggle('list-name-hover');
  }

  render () {
    const { filteredUsers } = this.props;
    const mapUsers = filteredUsers.map(user =>
      <li className="list-group-item user-names">
        <button className="btn btn-default pull-right">
          <span className="icon icon-phone" data-username={user.username} onClick={this.callUser.bind(this)}></span>
        </button>
        <button className="btn btn-default pull-right">
          <span className="icon icon-mail" data-username={user.username} data-user-id={user.id} onClick={this.msgUser.bind(this)}></span>
        </button>
        <button className="btn btn-default pull-right">
          <span className="icon icon-plus" data-username={user.username} data-user-id={user.id} onClick={this.addUser.bind(this)}></span>
        </button>
        <button className="btn btn-default pull-right">
          <span className="pull-right icon icon-user-add" data-username={user.username} data-user-id={user.id} onClick={this.inviteToRoom.bind(this)}></span>
        </button>
        <div className="media-body pull-left list-username" onMouseEnter={this.alt.bind(this, user)} onMouseLeave={this.alt.bind(this, user)}>
          <strong>{user.username}</strong>
        </div>
        <div className="media-body pull-left list-name-empty"  ref={"user" + user.username}>
          <strong>{user.username}</strong>
        </div>
      </li>
    );

    if (!filteredUsers) {
      return (
        <div className="users"> Loading... </div>
      )
    }
    return (
      <div className="users" ref="users">
        <ul className="list-group showAllUsers">
          <li className="list-group-header">
            <input className="form-control" type="text" placeholder="Search for someone" value={this.props.value} onChange={this.filterUsers.bind(this)} onFocus={this.showUserMenu.bind(this)} onBlur={this.hideUserMenu.bind(this)}/>
          </li>
          {mapUsers}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.userReducer;
export default connect(mapStateToProps)(withRouter(Users));
