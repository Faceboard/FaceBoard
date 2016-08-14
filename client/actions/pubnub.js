export function Pubnub () {
  var phone = PHONE({
    number        : '1234',
    publish_key   : 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c',
    subscribe_key : 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe',
    ssl           : true
  });

  // As soon as the phone is ready we can make calls
  phone.ready(function(){

    // Dial a Number and get the Call Session
    // For simplicity the phone number is the same for both caller/receiver.
    // you should use different phone numbers for each user.
    var session = phone.dial('1234');

  });

  // When Call Comes In or is to be Connected
  phone.receive(function(session){

    // Display Your Friend's Live Video
    session.connected(function(session){
      document.getElementById('remoteVideo').appendChild(session.video);
    });
  });
}