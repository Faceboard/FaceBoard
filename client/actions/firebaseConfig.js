import Firebase from 'firebase';
import Firepad from 'firepad';

var config = {
  apiKey: 'AIzaSyBgx7ye7Nlfo8UwlbhpWhBqwsYDkhs7QQc',
  authDomain: 'face-board.firebaseapp.com',
  databaseURL: 'https://face-board.firebaseio.com',
  storageBucket: 'face-board.appspot.com'
};

export function configFirebase () {
  Firebase.initializeApp(config);
}

export function fetchFirepad (mode) {
  return function (dispatch) {
    dispatch({type: 'FIREPAD_MODE', mode: mode});
    mode = mode || 'javascript';
    if (!Firebase.apps.length) {
      configFirebase();
    }
    dispatch({type: 'FETCHING_FIREPAD'});
    var firepadRef = Firebase.app().database().ref('/' + global.localStorage.roomname);
    var codeMirror = CodeMirror(document.getElementById('firepad'),
      {
        lineNumbers: true,
        mode: mode,
        theme: 'atom',
        tabSize: 2,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        autoCloseBrackets: true,
        matchBrackets: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });
    Firepad.fromCodeMirror(firepadRef, codeMirror, { defaultText: 'Hello, World!' });
    dispatch({type: 'FIREPAD_FETCHED'});
  };
}
