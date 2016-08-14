export function Pubnub () {
  // As soon as the phone is ready we can make calls
  phone.ready(function(){
    var session = phone.dial('1234');
    console.log('session', session);

  });

  // When Call Comes In or is to be Connected
  phone.receive(function(session){

    // Display Your Friend's Live Video
    session.connected(function(session){
      document.getElementById('remoteVideo').appendChild(session.video);
    });
  });
}