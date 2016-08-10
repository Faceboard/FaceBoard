import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import VideoList from './videoList';
import MainSession from './mainSession';
import FriendsList from './friendsList';

class Session extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <div id="sessionWrapper">
          <Link to="/">Lobby</Link>
          <h2>Session Place</h2>
          <FriendsList />
          <MainSession />
          <VideoList />
        </div>
      );
  }
}

// change this in time
const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(Session));
//places to rename sessionName: session.js, component,
