import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { inviteToSession, makeSession, sessionChange, makePrivateSession } from '../actions/session';
import socket from '../sync';
import io from 'socket.io-client';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getAllUsers())
  }

  createPrivateSession(e) {
    e.preventDefault()
    const { session, router } = this.props;
    console.log('before make session', session);
    makeSession(session)
      .then((session) => {
        router.replace('/session')
      })
  }

  createSession(username) {
    const { session, router } = this.props;
    makePrivateSession(global.localStorage.username, username);
    router.replace('/session');
  }

  sessionChange(e) {
    this.props.dispatch(sessionChange(e.target.name, e.target.value))
  }

  render() {
    const { users } = this.props;
    const mapUsers = users.map(user => <li onClick={this.createSession.bind(this, user.userid)} key={user.userid}>{user.userid} | {user.id} </li>)

    if (!users.length){
      return (
        <div id="friendsList">
        </div>
      )
    }
    return (
      <div id="friendsList">
      <form onSubmit={this.createPrivateSession.bind(this)}>
        <input type="text" name="session" value={this.props.session} onChange={this.sessionChange.bind(this)}/>
        <button> Submit </button>
      </form>
      <ul>
        {mapUsers}
      </ul>
      </div>
    )
  }
}

const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(FriendsList));
