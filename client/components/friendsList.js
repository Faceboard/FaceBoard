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

  privateMessageStart (e) {
    const { router } = this.props;
    pChatStart(e, router);
  }

  removeFriend (e) {
    deleteFriend(e.target.value);
  }

  render () {
    const { friends } = this.props;
    const friendsNoSelf = friends.filter(f => f.friendname !== global.localStorage.username)
    const mapFriends = friendsNoSelf.map(friend =>
      <li className="list-group-item user-names friends" onClick={this.privateMessageStart.bind(this)}>
        <button className="btn btn-default pull-right">
          <span className="icon icon-minus" value={friend.friendname} onClick={this.removeFriend.bind(this)}></span>
        </button>
        <div className="media-body pull-left fa fa-star-o" key={friend.id} value={friend.friendid}>
          <strong>{friend.friendname}</strong>
        </div>
      </li>
    );

    if (!friends.length) {
      return (
        <div id="friendsList">
        </div>
      );
    }
    return (
      <div id="friendsList">
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