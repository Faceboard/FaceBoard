import React from 'react';
import { Pubnub } from '../actions/pubnub';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    global.localStorage.test = false;
  }

  componentDidMount() {
    Pubnub();
  }

  render() {
    return (
      <div id="remoteVideo">
      </div>
    )
  }
}

export default Videos;