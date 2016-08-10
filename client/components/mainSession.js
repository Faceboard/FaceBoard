import React from 'react';
import Firebase from 'firebase';
import Firepad from 'firepad';
import { configFirebase } from '../actions/firebaseConfig';

// const MainSession = () => (
//   <div id="mainSession">
//     <div id="firepad">
//     </div>
//   </div>
// )

class MainSession extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    configFirebase();
    var firepadRef = Firebase.database().ref('/test');
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
    console.log('codemirror', codeMirror)
    Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' });
  }

  render() {

    return (
      <div id="mainSession">
        <div id="firepad">
          <div id="Codemirror">
          </div>
        </div>
      </div>
    )
  }
}

export default MainSession;
