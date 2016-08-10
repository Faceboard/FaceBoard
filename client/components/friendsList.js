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
    socket.on('chat message', function (data) {
      console.log('something');
      console.log('THIS IS THE TEST SESSION', data);
    });
    this.props.dispatch(getAllUsers())
  }

  // createSession(e) {
  //   e.preventDefault()
  //   const { session, router } = this.props;
  //   console.log('before make session', session);
  //   makeSession(session)
  //     .then((session) => {
  //       router.replace('/session')
  //     })
  // }

  createSession(e) {
    e.preventDefault();
    console.log('SOMETHING IS WORKING IN CREATESESSION');
    const { session, router } = this.props;
    makePrivateSession(global.localStorage.username, e.target.key);
  }

  sessionChange(e) {
    this.props.dispatch(sessionChange(e.target.name, e.target.value))
  }

  render() {
    const { users } = this.props;
    const mapUsers = users.map(user => <li onClick={this.createSession.bind(this)} key={user.userid}>{user.userid} | {user.id} </li>)

    if (!users.length){
      return (
        <div id="friendsList">
        </div>
      )
    }
    return (
      <div id="friendsList">
      <form onSubmit={this.createSession.bind(this)}>
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
