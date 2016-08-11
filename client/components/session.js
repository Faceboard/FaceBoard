import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import VideoList from './videoList';
import MainSession from './mainSession';
import FriendsList from './friendsList';
import Firebase from 'firebase';
import Firepad from 'firepad';
import { configFirebase } from '../actions/firebaseConfig';


class Session extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    configFirebase();
    var firepadRef = Firebase.database().ref('/test');
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' });
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
