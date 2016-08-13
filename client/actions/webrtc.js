import socket from '../sync';

let localStream;
let remoteStream;
let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');
let video;
let pc1;
let pc2;

let startTime;
let config = {
  'iceServers': [{
    'url': 'stun:stun4.1.google.com:19302'
  }]
};
let offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

export const constraints = {
  audio: true,
  video: true
};

export function successCaller (stream) {
  video = document.getElementById('localVideo');
  window.localStream = localStream = stream; // stream available to console

  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }

  window.pc1 = pc1 = new webkitRTCPeerConnection(config);

  pc1.onaddstream = gotRemoteStream;

  pc1.onicecandidate = (event) => {
    onIceCandidiate(pc1, event);
  }

  pc1.oniceconnectionstatechange = (event) => {
    onIceStateChange(pc1, event);
  }

  // building up our session description
  pc1.addStream(localStream);

  // making an offer to be sent later
  pc1.createOffer(offerOptions)
    .then(onCreateOfferSuccess, onCreateSessionDescriptionError);
}

export function successReceiver (stream) {
  window.remoteStream = remoteStream = stream;

  window.pc2 = pc2 = new webkitRTCPeerConnection(config);

  pc2.onaddstream = gotRemoteStream;

  pc2.onIceCandidiate = (event) => {
    onIceCandidiate(pc2, event);
  }

  pc2.oniceconnectionstatechange = (event) => {
    onIceStateChange(pc2, event);
  }

  pc2.addStream(remoteStream);

  pc2.createAnswer(offerOptions)
    .then(onCreatedAnswerSuccess, onSetSessionDescriptionError);
}

const onCreatedAnswerSuccess = (description) => {
  pc2.setLocalDescription(description)
  let answer = {
    roomname: global.localStorage.roomname,
    description: description
  };
  socket.emit('answer sent', answer);
}

const setCallerDescription = (description) => {
  pc1.setRemoteDescription(description);
}

export const setReceiverDescription = (description) => {
  pc2.setRemoteDescription(description);
  navigator.webkitGetUserMedia(constraints, successReceiver, errorCallback);
}


export const makeOffer = () => {
  pc1.createOffer(offerOptions)
    .then(onCreateOfferSuccess, onCreateSessionDescriptionError);
}

export function errorCallback (error) {
  console.log('navigator.webkitGetUserMedia error: ', error);
}

const gotRemoteStream = (event) => {
  // Add remoteStream to global scope so it's accessible from the browser console
  window.remoteStream = remoteVideo.srcObject = event.stream;
}

// this is why webcam is not showing up when you first get in for Caller
export function initOffer () {
  // set local webcam
  navigator.webkitGetUserMedia(constraints, successCaller, errorCallback);
}

const getName = (pc) => {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

const getOtherPc = (pc) => {
  return (pc === pc1) ? pc2 : pc1;
}

const gotStream = (stream) => {
  localVideo.srcObject = stream;
  window.localStream = localStream = stream;
}

const onCreateSessionDescriptionError = (error) => {
  console.log('Failed to create session description : ' + error.toString());
}

const onCreateOfferSuccess = (description) => {
  const data = {
    description: description,
    roomname: global.localStorage.roomname
  };
  // send the offer
  socket.emit('send offer', data);

  pc1.setLocalDescription(description)
    .then(() => {
      onSetLocalSuccess(pc1);
    }, onSetSessionDescriptionError);
};

const onSetLocalSuccess = (pc) => {
  console.log(getName(pc) + ' setLocalDescription complete');
}

const onSetRemoteSuccess = (pc) => {
  console.log(getName(pc) + ' setRemoteDescription complete');
}

const onSetSessionDescriptionError = (error) => {
  console.log('Failed to set session description: ' + error.toString());
}

const onIceCandidiate = (pc, event) => {
  if (event.candidate) {
    getOtherPc(pc).addIceCandidate(new RTCIceCandidate(event.candidate))
      .then(() => {
        onAddIceCandidateSuccess(pc);
      }, (error) => {
        onAddIceCandidateError(pc, error);
      });
  }
}

const onAddIceCandidateSuccess = (pc) => {
  console.log(getName(pc) + ' addIceCandidate success');
}

const onAddIceCandidateError = (pc, error) => {
  console.log(getName(pc) + ' failed to add ICE candidiate: ' + error.toString());
}

const onIceStateChange = (pc, event) => {
  if (pc) {
    console.log(getName(pc) + 'ICE state: ' + pc.iceConnectionState + 'ICE state change event: ' + event);
  }
}
