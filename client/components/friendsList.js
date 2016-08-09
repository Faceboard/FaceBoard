import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';



class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getAllUsers())
  }

  render() {
    const { users } = this.props;
    const mapUsers = users.map(user => <li key={user.id}>{user.userid}</li>)
    if (!users.length){
      return (
        <div id="friendsList">
        </div>
      )
    }
    return (
      <div id="friendsList">
        <ul>
          {mapUsers}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => state.userReducer;
export default connect(mapStateToProps)(withRouter(FriendsList));
