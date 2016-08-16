const Designer = window.designer;

Designer.widgetHtmlURL = 'https://cdn.webrtc-experiment.com/Canvas-Designer/widget.html';
Designer.widgetJsURL = 'https://cdn.webrtc-experiment.com/Canvas-Designer/widget.js';

export function connectRtc () {

  const Connection = window.connection;

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

  // Designer.addSyncListener(function(data) {
  //   Connection.send({
  //     actualData: data,
  //     Designer: true
  //   });
  // });

  const roomid = 'face-board-cat';

  // Connection.open(roomid, function(){
  //   console.log('open room', roomid)
  // });

  console.log('HERERERE',roomid)
  // if(location.hash.replace('#', '').length) {
  //   var roomid = location.hash.replace('#', '');
  //   Connection.join(roomid);
  // }

}


export default Designer;
// export default Connection;