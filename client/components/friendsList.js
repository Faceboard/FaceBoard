import _ from 'lodash';
import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { inviteToSession, makeSession, sessionChange, makePrivateSession, askSecondUserToJoin } from '../actions/session';
import socket from '../sync';
import { makeMenu, reattachMenus } from '../actions/menu';
import { addFriend, getAllFriends } from '../actions/friends';
import { getPrivateMessages, getAllFriendPrivateMsg, pChatStart } from '../actions/chat';
import { removeHighlight, startPChat } from '../helpers/friendHelpers';


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
  }

  componentWillUnmount () {
    reattachMenus();
  }

  addPerson (e) {
    e.preventDefault();
    reattachMenus();
    if (e.target.innerHTML !== global.localStorage.username) {
      this.props.dispatch(addFriend(e.target.value, e.target.innerHTML));
    }
  }

  privateMessageStart (e) {
    const { router } = this.props;
    pChatStart(e, router);
  }

  render () {
    const { friends } = this.props;

    const mapFriends = friends.map(friend => <li onClick={this.privateMessageStart.bind(this)}
      className="friends list-group-item" key={friend.id} value={friend.friendid}>{friend.friendname}</li>);

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
