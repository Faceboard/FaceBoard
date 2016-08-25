import _ from 'lodash';
import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { inviteToSession, makeSession, sessionChange, makePrivateSession, askSecondUserToJoin } from '../actions/session';
import socket from '../sync';
import { makeMenu, reattachMenus } from '../actions/menu';
import { addFriend, getAllFriends, deleteFriend } from '../actions/friends';
import { getPrivateMessages, getAllFriendPrivateMsg, pChatStart } from '../actions/chat';
import { findFriend, startPChat } from '../helpers/friendHelpers';
import { sendRoomInvite } from '../helpers/roomChatHelpers';

class FriendsList extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllFriends());
    const { router } = this.props;
    socket.on('userWantsToCreateSession', function (data) {
      askSecondUserToJoin(data);
    });
  }

  componentDidUpdate () {
    const { router } = this.props;
    makeMenu(router);
    if (global.newFriend) {
      findFriend(global.newFriend);
    }
    if (global.newName) {
      startPChat(global.newName);
    }
  }

  componentWillUnmount () {
    reattachMenus();
  }

  callUser (e) {
    e.preventDefault();
    makePrivateSession(global.localStorage.username, e.target.dataset['friendname']);
  }

  inviteToRoom (e) {
    sendRoomInvite(e.target.dataset['friendname']);
  }

  privateMessageStart (e) {
    const { router } = this.props;
    pChatStart(e, router);
  }

  removeFriend (e) {
    deleteFriend(e.target.dataset['friendname']);
  }

  render () {
    const { friends } = this.props;
    const friendsNoSelf = friends.filter(f => f.friendname !== global.localStorage.username)
    const mapFriends = friendsNoSelf.map(friend =>
      <li className="list-group-item user-names friends offline" data-friendname={friend.friendname}  key={friend.id}>
        <span
          className="btn btn-default pull-right icon icon-minus"
          data-friendname={friend.friendname}
          onClick={this.removeFriend.bind(this)}>
        </span>
        <span
          className="btn btn-default pull-right icon icon-phone"
          data-friendname={friend.friendname}
          onClick={this.callUser.bind(this)}>
        </span>
        <span className="btn btn-default pull-right icon icon-mail"
          data-friendname={friend.friendname} data-friendid={friend.friendid}
          onClick={this.privateMessageStart.bind(this)}>
        </span>
        <div className="pull-left svg-class" key={friend.id}>
          <div>
            <svg width="10" height="10">
              <circle cx="5" cy="5" r="4" />
            </svg>
          </div>
        </div>
        <div className="media-body pull-left">
          <strong>{friend.friendname}</strong>
        </div>
      </li>
    );

    if (!friends.length) {
      return (
        <div className="friendsList">
        </div>
      );
    }
    return (
      <div className="friendsList">
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
