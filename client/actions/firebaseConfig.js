import Firebase from 'firebase';
import Firepad from 'firepad';

var config = {
  apiKey: 'AIzaSyBgx7ye7Nlfo8UwlbhpWhBqwsYDkhs7QQc',
  authDomain: 'face-board.firebaseapp.com',
  databaseURL: 'https://face-board.firebaseio.com',
  storageBucket: 'face-board.appspot.com'
};

export function configFirebase (id) {
  Firebase.initializeApp(config);
}

export function fetchFirepad (id) {
  return function (dispatch) {
    configFirebase(id);
    dispatch({type: 'FETCHING_FIREPAD'});
    var firepadRef = Firebase.database().ref(id);
    var codeMirror = CodeMirror(document.getElementById('firepad'),
      { lineWrapping: true, lineNumbers: true, mode: 'javascript' });
    Firepad.fromCodeMirror(firepadRef, codeMirror, { defaultText: 'Hello, World!' });
    dispatch({type: 'FIREPAD_FETCHED'});
  };
}

export function deleteFirepad (id) {
  Firebase.app().delete().then(function (err) {
    if (err) throw err;
    console.log('SUCCESSFULLY DELETED APP');
  });
}
