import Firebase from 'firebase';
import Firepad from 'firepad';

var config = {
        apiKey: "AIzaSyBgx7ye7Nlfo8UwlbhpWhBqwsYDkhs7QQc",
        authDomain: "face-board.firebaseapp.com",
        databaseURL: "https://face-board.firebaseio.com",
        storageBucket: "face-board.appspot.com",
    };

export function configFirebase() {
  Firebase.initializeApp(config);
}