import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';

class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    var aww = new AwwBoard('#whiteboard', {
      apiKey: '4e0bde7f-d2c2-438f-a2af-a3cd3ab506ae',
      autoJoin: true,
      boardLink: 'face-board-awwapp',
      sizes: [3, 5, 8, 13, 20],
      fontSizes: [10, 12, 16, 22, 30],
      menuOrder: ['colors', 'sizes', 'tools', 'admin',
        'utils'],
      tools: ['pencil', 'eraser', 'text', 'image', 'undo', 'trash'],
      colors: [ "#000000", "#f44336", "#4caf50", "#2196f3",
        "#ffc107", "#9c27b0",     "#e91e63", "#795548"],
      defaultColor: "#000000",
      defaultSize: 8,
      defaultTool: 'pencil'
    });

    this.props.dispatch(fetchFirepad());
  }

  render () {
    return (
      <div id="mainSession">
        <div id="firepad">
        </div>
        <div id="whiteboard">
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.firepadReducer;
export default connect(mapStateToProps)(withRouter(MainSession));
