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
import { findFriend } from '../helpers/friendHelpers';

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
      console.log('this happened');
      findFriend(global.newFriend);
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
    const mapFriends = friends.map(friend =>
      <div className='list-group-item'>
        <li onClick={this.privateMessageStart.bind(this)}
        className="friends" key={friend.id} value={friend.friendid}>{friend.friendname}</li>
        <button onClick={this.removeFriend.bind(this)} value={friend.friendname}></button>
      </div>
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