import React from 'react';
import { constraints, successCallback, errorCallback, initOffer } from '../actions/webrtc';

class Videos extends React.Component {
  constructor(props) {
    super(props);
  }

<<<<<<< d156d6c0df28d00262d5a191adf674a336fba4a9
=======
  componentDidMount() {
    initOffer();
  }

>>>>>>> (feat) add local session description and prepare to send an offer
  render() {
    return (
      <video id="localVideo">
      </video>
    )
  }
}

export default Videos;