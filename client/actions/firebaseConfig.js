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

export function fetchFirepad () {
  return function (dispatch) {
    console.log('FIREBASE APPS', Firebase.apps);
    if (!Firebase.apps.length) {
      configFirebase();
    }
    dispatch({type: 'FETCHING_FIREPAD'});
    var firepadRef = Firebase.app().database().ref('/' + global.localStorage.roomname);
    var codeMirror = CodeMirror(document.getElementById('firepad'),
      {
        lineWrapping: true,
        lineNumbers: true,
        mode: 'javascript',
        tabSize: 2,
        autoCloseBrackets: true,
        matchBrackets: true,
        autoCloseTags: true
      });
    Firepad.fromCodeMirror(firepadRef, codeMirror, { defaultText: 'Hello, World!' });
    dispatch({type: 'FIREPAD_FETCHED'});
  };
}

export function deleteFirepad () {
  return function (dispatch) {
    Firebase.app().database().ref('/' + global.localStorage.roomname).remove().then(function (err) {
      if (err) throw err;
    });
  };
}
