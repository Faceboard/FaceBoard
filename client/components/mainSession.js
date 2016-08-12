import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';


class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(fetchFirepad('/' + global.localStorage.session));
  }

  componentWillUnmount () {
    document.getElementById('firepad').innerHTML = '';
    deleteFirepad('/' + global.localStorage.session);
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
