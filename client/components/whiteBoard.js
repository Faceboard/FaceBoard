import React from 'react';
import Designer, { connectRtc } from '../actions/whiteboardConfig';

class Whiteboard extends React.Component {

  componentDidMount () {
    connectRtc();
    Designer.appendTo(document.getElementsByClassName('whiteboard')[0]);
  }

  render () {
    return (
      <div id="whiteboard">
      </div>
    );
  }
}

export default Whiteboard;
