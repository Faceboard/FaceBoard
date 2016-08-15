import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { inviteToSession, makeSession, sessionChange, makePrivateSession, askSecondUserToJoin } from '../actions/session';
import socket from '../sync';
import io from 'socket.io-client';
import { makeMenu } from '../actions/menu';

class FriendsList extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllUsers());
    const { router } = this.props;
    socket.on('userWantsToCreateSession', function (data) {
      askSecondUserToJoin(data);
    });
  }

  componentDidUpdate () {
    makeMenu();
  }

  // createSession (username) {
  //   const { session, router } = this.props;
  //   makePrivateSession(global.localStorage.username, username);
  // }
  // onClick={this.createSession.bind(this, user.userid)}


  sessionChange (e) {
    this.props.dispatch(sessionChange(e.target.name, e.target.value));
  }

  render () {
    const { users } = this.props;
    const mapUsers = users.map(user => <li className="friends" key={user.userid}>{user.userid}</li>);

    if (!users.length) {
      return (
        <div id="friendsList">
        </div>
      );
    }
    return (
      <div id="friendsList">
        <input type="text" name="session" value={this.props.session} onChange={this.sessionChange.bind(this)}/>
        <button> Submit </button>
      <ul>
        {mapUsers}
      </ul>
      </div>
    );
  }
}

const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(FriendsList));
