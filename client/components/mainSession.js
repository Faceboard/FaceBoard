import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { configFirebase, fetchFirepad } from '../actions/firebaseConfig';


class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(fetchFirepad());
  }

  render () {
    return (
      <div id="mainSession">
        <div id="firepad">
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.firepadReducer;
export default connect(mapStateToProps)(withRouter(MainSession));
