import React from 'react';
import { withRouter, connect } from 'react-redux';
import Users from './users';
import FriendsList from './friendsList';
import RoomList from './roomList';
import { logout } from '../auth';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }

  onLogout () {
    logout();
    this.props.router.replace('/auth');
  }

  render () {
    return (
      <div className="sidebar">
        <div className="username">
          {global.localStorage.username}
          <button className="btn btn-default pull-right" onClick={this.onLogout.bind(this)}>
            <span className="icon icon-logout"></span>
          </button>
        </div>
        <Users />
        <RoomList />
        <FriendsList />
      </div>
    );
  }
}

export default Sidebar;
