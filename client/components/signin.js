import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authChange } from '../actions/action';
import { signIn, authenticated } from '../auth';

class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  onFieldChange(e) {
    this.props.dispatch(authChange(e.target.name, e.target.value));
  }

  onSignIn(e) {
    e.preventDefault();
    const { username, password, router } = this.props;
    signIn(username, password)
      .then(() => {
        if (authenticated()) {
          router.replace('/');
        } else {
          console.error('username or password is incorrect');
        }
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSignIn.bind(this)}>
          <h2> Sign In! </h2>
          <input value={this.props.username} name="username" onChange={this.onFieldChange.bind(this)} />
          <input value={this.props.password} name="password" onChange={this.onFieldChange.bind(this)} type="password" />
          <button>Sign in</button><br />
          <Link to="/auth"><button> Back to homepage </button></Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Signin));
