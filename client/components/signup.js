import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authChange } from '../actions/action';
import { signUp } from '../auth';

class Signup extends React.Component{
  constructor(props) {
    super(props);
  }

  onFieldChange(e) {
    this.props.dispatch(authChange(e.target.name, e.target.value));
  }

  onSignUp(e) {
    e.preventDefault();
    const { username, password } = this.props;
    signUp(username, password);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSignUp.bind(this)}>
          <h2> Sign Up! </h2>
          <input value={this.props.username} name="username" onChange={this.onFieldChange.bind(this)} />
          <input value={this.props.password} name="password" onChange={this.onFieldChange.bind(this)} type="password" />
          <button>Sign up</button><br />
          <Link to="/auth"><button> Back to homepage </button></Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Signup));
