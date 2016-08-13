import socket from '../sync';

let localStream;
let localVideo = document.getElementById('localVideo');
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

let video;

export function successCallback (stream) {
  video = document.getElementById('localVideo');
  window.localStream = localStream = stream; // stream available to console

  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }

  window.pc1 = pc1 = new webkitRTCPeerConnection(config);

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

export function errorCallback (error) {
  console.log('navigator.webkitGetUserMedia error: ', error);
}

export function initOffer () {
  // set local webcam
  navigator.webkitGetUserMedia(constraints, successCallback, errorCallback);

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

const start = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(gotStream)
  .catch((e) => {
    alert('getUserMedia() error: ' + e.name);
  });
}

const call = () => {
  startTime = window.performance.now();
  let videoTracks = localStream.getVideoTracks();
  let audioTracks = localStream.getAudioTracks();

  window.pc1 = pc1 = new webkitRTCPeerConnection(config);

  pc1.onicecandidate = (event) => {
    onIceCandidiate(pc1, event);
  }

  window.pc2 = pc2 = new webkitRTCPeerConnection(config);

  pc2.onicecandidate = (event) => {
    onIceCandidiate(pc2, event);
  }

  pc1.oniceconnectionstatechange = (event) => {
    onIceStateChange(pc1, event);
  }

  pc2.oniceconnectionstatechange = (event) => {
    onIceStateChange(pc2, event);
  }

  pc2.onaddstream = gotRemoteStream;

  pc1.addStream(localStream);

  pc1.createOffer(offerOptions)
    .then(onCreateOfferSuccess, onCreateSessionDescriptionError);
}

const onCreateSessionDescriptionError = (error) => {
  console.log('Failed to create session description : ' + error.toString());
}

const onCreateOfferSuccess = (description) => {
  // setting our local description, we need our local and remote description to be set
  pc1.setLocalDescription(description)
    .then(() => {
      onSetLocalSuccess(pc1);
    }, onSetSessionDescriptionError);

  // pc2.setRemoteDescription(description)
  //   .then(() => {
  //     onSetRemoteSuccess(pc2);
  //   }, onSetSessionDescriptionError);

  // pc2.createAnswer()
  //   .then(oncreateAnswerSuccess, onCreateSessionDescriptionError);
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

const gotRemoteStream = (event) => {
  window.remoteStream = remoteVideo.srcObject = event.stream;
}

const oncreateAnswerSuccess = (description) => {
  pc2.setLocalDescription(description)
    .then(() => {
      onSetLocalSuccess(pc2);
    }, onSetSessionDescriptionError);

  pc1.setRemoteDescription(description)
    .then(() => {
      onSetRemoteSuccess(pc1);
    }, onSetSessionDescriptionError);
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
