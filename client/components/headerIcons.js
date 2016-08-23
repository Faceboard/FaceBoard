import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../auth';
import { getAllUsers, filterSearch } from '../actions/userActions';
import { makePrivateSession } from '../actions/session';
import { startPChatFromAllUsers } from '../actions/chat';
import { addFriend } from '../actions/friends';

class HeaderIcons extends React.Component {
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
    this.props.dispatch(addFriend(e.target.dataset['userId'], e.target.dataset['username']));
    startPChatFromAllUsers(e, router);
  }

  filterUsers (e) {
    this.props.dispatch(filterSearch(e.target.value));
  }

  render () {
    const { filteredUsers } = this.props;
    const mapUsers = filteredUsers.map(user =>
      <li  className=" list-group-item" key={user.username}>
        <span className="icon icon-phone btn btn-default" data-username={user.username} onClick={this.callUser.bind(this)}></span>
        <span className="icon icon-pencil btn btn-default" data-username={user.username} data-user-id={user.id} onClick={this.msgUser.bind(this)}></span>
        <div className="media-body pull-right">
          <strong>{user.username}</strong>
        </div>
      </li>
    );
    if (!filteredUsers) {
      return (
        <div> Loading... </div>
      )
    }
    return (
      <div className="headerIcons">
        <button className="btn btn-default pull-right" onClick={this.onLogout.bind(this)}>
          <span className="icon icon-logout"></span>
        </button>
        <button className="btn btn-default pull-right" >
          <span className="icon icon-search"></span>
        </button>
        <ul className="list-group pull-right showAllUsers">
          <li className="list-group-header">
            <input className="form-control" type="text" placeholder="Search for someone" value={this.props.value} onChange={this.filterUsers.bind(this)}/>
          </li>
          {mapUsers}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.userReducer;
export default connect(mapStateToProps)(withRouter(HeaderIcons));
