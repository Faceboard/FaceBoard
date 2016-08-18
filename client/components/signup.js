import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authChange } from '../actions/action';
import { signUp, authenticated } from '../auth';

class Signup extends React.Component {
  constructor (props) {
    super(props);
  }

  onFieldChange (e) {
    this.props.dispatch(authChange(e.target.name, e.target.value));
  }

  onSignUp (e) {
    e.preventDefault();
    const { username, password, router } = this.props;
    signUp(username, password)
      .then(() => {
        if (authenticated()) {
          router.replace('/');
        } else {
          console.log('Failed to find or create user');
        }
      })
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
        <form className="centerSign" onSubmit={this.onSignUp.bind(this)}>
          <input value={this.props.username} className="signInput" name="username" placeholder="username" onChange={this.onFieldChange.bind(this)} />
          <input value={this.props.password} className="signInput" name="password" placeholder="password" onChange={this.onFieldChange.bind(this)} type="password" />
          <button className="btn btn-default centerBtn">Sign up</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state.authReducer;
export default connect(mapStateToProps)(withRouter(Signup));
