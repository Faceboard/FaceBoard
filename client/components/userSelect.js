import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ProgressCircle } from 'react-desktop/macOs';
import { getAllUsers } from '../actions/userActions';
import { showUserSelect, hideUserSelect, chooseUser } from '../actions/userActions';
import socket from '../sync';

class UserSelect extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getAllUsers());
  }

  closeUserSelect (e) {
    e.preventDefault();
    hideUserSelect();
  }

  changeUser (e) {
    global.localStorage.invitedUser = e.target.value;
    this.props.dispatch(chooseUser(e.target.value));
  }

  inviteUser () {
    const { chosenUser } = this.props;
    let roomInvObj = {
      roomname: global.localStorage.currentRoom,
      secondusername: chosenUser,
      firstusername: global.localStorage.username
    };
    socket.emit('send room invite', roomInvObj);
    hideUserSelect();
  }

  render () {
    const { users } = this.props;
    const mapUsers = users.map(u =>
      <option key={u.id} value={u.username}>
        {u.username}
      </option>
    );
    const inviteText = "Invite a user to " + global.localStorage.currentRoom;

    if (!users) {
      return (
        <div className="progresscircle">
          <ProgressCircle size={40}/>
        </div>
      );
    }

    return (
      <div className="user-select no-show">
        <div className="dim-background">
        </div>
        <div className="room-select">
          <div className="upper-div">
            <span className="invite-header-text">{inviteText}</span>
            <span className="btn btn-default icon icon-cancel-squared pull-right close-bar" onClick={this.closeUserSelect.bind(this)}>
            </span>
          </div>
          <div className="select-room">
            <div className="invite-text">Invite: </div>
            <select onChange={this.changeUser.bind(this)}>
              {mapUsers}
            </select>
            <div className="action-buttons">
              <button onClick={this.inviteUser.bind(this)} className="invite-button">Invite</button>
              <button onClick={this.closeUserSelect.bind(this)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => state.userReducer;
export default connect(mapStateToProps)(withRouter(UserSelect));
