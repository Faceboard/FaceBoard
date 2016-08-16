import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';
import Designer from '../actions/whiteboardConfig';


class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(fetchFirepad());
    Designer.appendTo(document.getElementById('whiteboard'));
  }

  componentWillUnmount () {
    this.props.dispatch(deleteFirepad());
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
