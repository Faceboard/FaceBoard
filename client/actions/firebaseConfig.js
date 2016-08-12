import Firebase from 'firebase';
import Firepad from 'firepad';

// var CodeMirror = CodeMirror;

var config = {
  apiKey: 'AIzaSyBgx7ye7Nlfo8UwlbhpWhBqwsYDkhs7QQc',
  authDomain: 'face-board.firebaseapp.com',
  databaseURL: 'https://face-board.firebaseio.com',
  storageBucket: 'face-board.appspot.com'
};

export function configFirebase () {
  Firebase.initializeApp(config);
}

export function fetchFirepad () {
  return function (dispatch) {
    configFirebase();
    dispatch({type: 'FETCHING_FIREPAD'});
    console.log('WHYYYYYYYYYYYYYYYYYYYYYYYY');
    var firepadRef = Firebase.database().ref('/test');
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
    console.log('codemirror', codeMirror);
    Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' });
    console.log('ABOUT TO DISPATCH');
    dispatch({type: 'FIREPAD_FETCHED'});
  };
}
