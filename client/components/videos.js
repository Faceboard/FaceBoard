import React from 'react';
import { constraints, successCallback, errorCallback } from '../actions/webrtc';

class Videos extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.webkitGetUserMedia(constraints, successCallback, errorCallback);
  }

  render() {
    return (
      <video id="localVideo">
      </video>
    )
  }
}

export default Videos;
