import _ from 'lodash';
import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { inviteToSession, makeSession, sessionChange, makePrivateSession, askSecondUserToJoin } from '../actions/session';
import socket from '../sync';
import { makeMenu, reattachMenus } from '../actions/menu';
import { addFriend, getAllFriends } from '../actions/friends';
import { getPrivateMessages, getAllFriendPrivateMsg } from '../actions/chat';



class FriendsList extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllUsers());
    this.props.dispatch(getAllFriends());
    const { router } = this.props;
    socket.on('userWantsToCreateSession', function (data) {
      askSecondUserToJoin(data);
    });
  }

  componentDidUpdate () {
    makeMenu();
  }

  componentWillUnmount () {
    reattachMenus();
  }

  addPerson (e) {
    e.preventDefault();
    this.props.dispatch(addFriend(e.target.value, e.target.innerHTML));
  }

  privateMessageStart (e) {
    const { router } = this.props;
    global.localStorage.seconduserid = e.target.value;
    global.localStorage.secondusername = e.target.innerHTML;
    global.localStorage.pchat = global.localStorage.username + global.localStorage.seconduserid;
    let data = {
      pchat: global.localStorage.pchat,
      seconduserid: global.localStorage.seconduserid,
      secondusername: global.localStorage.secondusername
    }
    socket.emit('makePrivateChat', data);
    router.replace('/privateChat');
    this.props.dispatch(getAllFriendPrivateMsg(data.seconduserid));
  }

  render () {
    const { users, friends } = this.props;
    const mapUsers = users.map(user => <li onClick={this.addPerson.bind(this)} className="friends list-group-item" key={user.username} value={user.id}>{user.username}</li>);
    const filterFriends  = _.uniqBy(friends, (f) => f.friendid ).filter((f) => f.friendname !== global.localStorage.username );
    const mapFriends = filterFriends.map(friend => <li onClick={this.privateMessageStart.bind(this)} className="friends list-group-item" key={friend.id} value={friend.friendid}>{friend.friendname}</li>);

    if (!users.length) {
      return (
        <div id="friendsList">
        </div>
      );
    }
    return (
      <div id="friendsList">
        <ul className="allUsers list-group">
          <li className="list-group-header">
            <h4>All Users</h4>
          </li>
          {mapUsers}
        </ul>
        <hr />
        <ul className="allUsers list-group">
          <li className="list-group-header">
            <h4>Friends</h4>
          </li>
          {mapFriends}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(FriendsList));
