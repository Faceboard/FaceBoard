const Designer = window.designer;
const Connection = window.connection;

Designer.widgetHtmlURL = 'https://cdn.webrtc-experiment.com/Canvas-Designer/widget.html';
Designer.widgetJsURL = 'https://cdn.webrtc-experiment.com/Canvas-Designer/widget.js';

Connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
Connection.socketMessageEvent = 'canvas-designer';
Connection.enableFileSharing = false;
Connection.session = {
  data: true
};
Connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: false,
  OfferToReceiveVideo: false
};

export default Designer;
export default Connection;