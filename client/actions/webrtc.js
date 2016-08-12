export const constraints = {
  audio: false,
  video: true
};

export function successCallback (stream) {
  let video = document.getElementById('localVideo');
  window.stream = stream; // stream available to console
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
}

export function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

