import React from 'react';
import { withRouter, connect } from 'react-redux';
import Users from './users';
import FriendsList from './friendsList';
import RoomList from './roomList';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="sidebar">
        <div className="username">{global.localStorage.username}</div>
        <Users />
        <RoomList />
        <FriendsList />
      </div>
    );
  }
}

export default Sidebar;
