import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../auth';
import { getAllUsers, filterSearch } from '../actions/userActions';
import { makePrivateSession } from '../actions/session';
import { startPChatFromAllUsers } from '../actions/chat';
import { addFriend } from '../actions/friends';
import socket from '../sync';
import { sendRoomInvite } from '../helpers/roomChatHelpers';

class Users extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllUsers());
  }

  componentWillUnmount () {
    this.props.dispatch(filterSearch(''));
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
    let search = document.getElementById('user-search');
    this.props.dispatch(addFriend(e.target.dataset['userId'], e.target.dataset['username']));
    search.value = '';
  }

  filterUsers (e) {
    this.props.dispatch(filterSearch(e.target.value));
  }

  inviteToRoom (e) {
    sendRoomInvite(e.target.dataset['username']);
  }

  showUserMenu () {
    this.refs.users.classList.toggle('users-color');
  }

  hideUserMenu (e) {
    window.setTimeout(function() {
      this.refs.users.classList.toggle('users-color');
      this.props.dispatch(filterSearch(''));
    }.bind(this), 200);
  }

  alt (user) {
    this.refs["user" + user.username].classList.toggle('list-name-hover');
  }

  render () {
    const { filteredUsers } = this.props;
    const mapUsers = filteredUsers.map(user =>
      <li className="list-group-item user-names">
          <span className="btn btn-default pull-right icon icon-phone" data-username={user.username} onClick={this.callUser.bind(this)}></span>
          <span className="btn btn-default pull-right icon icon-mail" data-username={user.username} data-user-id={user.id} onClick={this.msgUser.bind(this)}></span>
          <span className="btn btn-default pull-right icon icon-plus" data-username={user.username} data-user-id={user.id} onClick={this.addUser.bind(this)}></span>
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
            <input id="user-search" className="form-control" type="text"
              placeholder="Search for user" value={this.props.value} onChange={this.filterUsers.bind(this)}
              onFocus={this.showUserMenu.bind(this)} onBlur={this.hideUserMenu.bind(this)}/>
          </li>
          <div className="allUsers">
            {mapUsers}
          </div>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.userReducer;
export default connect(mapStateToProps)(withRouter(Users));
