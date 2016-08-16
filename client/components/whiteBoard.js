import React from 'react';
import Designer from '../actions/whiteboardConfig';

class Whiteboard extends React.Component {

  componentDidMount () {
    Designer.appendTo(document.getElementsByClassName('whiteboard')[0]);
  }

  render () {
    return (
      <div className="whiteboard">
      </div>
    );
  }
}

export default Whiteboard;
