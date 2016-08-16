import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';
import Designer, { connectRtc } from '../actions/whiteboardConfig';


class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(fetchFirepad());
    connectRtc();
    Designer.appendTo(document.getElementsByClassName('whiteboard')[0]);
  }

  componentWillUnmount () {
    this.props.dispatch(deleteFirepad());
  }

  render () {
    return (
      <div id="mainSession">
        <div id="firepad">
        </div>
        <div className="whiteboard">
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.firepadReducer;
export default connect(mapStateToProps)(withRouter(MainSession));
