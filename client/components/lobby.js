import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout, authenticated } from '../auth';

class Lobby extends React.Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!authenticated()) {
      this.props.router.replace('/auth');
    }
  }

  onLogout() {
    logout();
    this.props.router.replace('/');
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Lobby));
