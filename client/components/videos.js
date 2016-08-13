import React from 'react';
import { constraints, successCallback, errorCallback, initOffer } from '../actions/webrtc';

class Videos extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (global.localStorage.isCaller) {
      initOffer();
    }
  }

  render() {
    return (
      <div>
        <video id="localVideo">
        </video>
        <video id="remoteVideo">
        </video>
      </div>
    )
  }
}

export default Videos;