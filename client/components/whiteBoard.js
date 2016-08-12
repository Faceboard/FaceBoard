import React from 'react';

class Whiteboard extends React.Component {

  componentDidMount() {
    designer.appendTo(document.getElementsByClassName("whiteboard")[0]);
  }

  render() {
    return (
      <div className="whiteboard">
      </div>
    )
  }
}

export default Whiteboard;