import React from 'react';
import { getAllUsers } from '../actions/userActions';
import { connect } from 'react-redux';



class FriendsList extends React.component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getAllUsers())
  }

  render() {
    return (
      <div id="friendsList">
      </div>
    )
  }
}

const mapStateToProps = state => state.userReducer;


export default connect(mapStateToProps);
