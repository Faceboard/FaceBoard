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

Connection.onopen = function(event) {
  if(Designer.pointsLength <= 0) {
    setTimeout(function() {
      Connection.send('plz-sync-points');
    }, 1000);
  }
};

Connection.onmessage = function(event) {
  if(event.data === 'plz-sync-points') {
    Designer.sync();
    return;
  }

  if(event.data.Designer) {
    Designer.syncData( event.data.actualData );
  }
};

export default Designer;
export default Connection;