import React from 'react';
import { withRouter, connect } from 'react-redux';
import Users from './users';
import FriendsList from './friendsList';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="sidebar">
        <div className="username">{global.localStorage.username}</div>
        <Users />
        <FriendsList />
      </div>
    );
  }
}

export default Sidebar;
