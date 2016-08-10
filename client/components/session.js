import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

class Session extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <div>
          <Link to="/">Lobby</Link>
          <h2>Session Place</h2>
        </div>
      );
  }
}

const mapStateToProps = state => state.sessionReducer;
export default connect(mapStateToProps)(withRouter(Session));
