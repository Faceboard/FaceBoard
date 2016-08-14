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

  componentDidUpdate() {
    if (global.localStorage.test === 'false') {
      delete global.localStorage.test;
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div id="remoteVideo">
      </div>
    )
  }
}

export default Videos;