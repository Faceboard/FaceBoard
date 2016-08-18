import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authChange } from '../actions/action';
import { signIn, authenticated } from '../auth';

class Signin extends React.Component {
  constructor (props) {
    super(props);
  }

  onFieldChange (e) {
    this.props.dispatch(authChange(e.target.name, e.target.value));
  }

  onSignIn (e) {
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

  goBack () {
    this.props.router.replace('/auth');
  }

  render () {
    return (
      <div className="authPage">
        <div className="mainHeader">
          Welcome to Faceboard!
          <button className="btn btn-default pull-right" onClick={this.goBack.bind(this)}>
            <span className="icon icon-home"></span>
          </button>
        </div>
        <form className="centerSign" onSubmit={this.onSignIn.bind(this)}>
          <input value={this.props.username} className="signInput" name="username" placeholder="username" onChange={this.onFieldChange.bind(this)} />
          <input value={this.props.password} className="signInput" name="password" placeholder="password" onChange={this.onFieldChange.bind(this)} type="password" />
          <button className="btn btn-default centerBtn">Sign in</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Signin));
