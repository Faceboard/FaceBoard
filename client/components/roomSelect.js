import React from 'react';
import { connect } from 'react-redux';
import { getRoomsForUser, chooseRoom, hideRoomSelect } from '../actions/room';
import { withRouter } from 'react-router';
import { ProgressCircle } from 'react-desktop/macOs';
import socket from '../sync';

class RoomSelect extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomsForUser());
  }

  inviteToRoom (e) {
    e.preventDefault();
    const { chosenRoom } = this.props;

    let roomInvObj = {
      roomname: chosenRoom,
      secondusername: global.localStorage.secondusername,
      firstusername: global.localStorage.username
    };
    socket.emit('send room invite', roomInvObj);
    hideRoomSelect();
  }

  changeRoom (e) {
    this.props.dispatch(chooseRoom(e.target.value));
  }

  closeRoomSelect (e) {
    e.preventDefault();
    hideRoomSelect();
  }

  render () {
    const { rooms } = this.props;
    const mapRooms = rooms.map(r =>
      <option key={r.id} value={r.roomname}>
        {r.roomname}
      </option>
    );
    const inviteText = "Invite " + global.localStorage.secondusername + " to a room";

    if (!rooms) {
      <div className="progresscircle">
        <ProgressCircle size={40}/>
      </div>
    }
    return (
      <div className="double-div no-show">
        <div className="dim-background">
        </div>
        <div className="room-select">
          <div className="upper-div">
            <span className="invite-header-text">{inviteText}</span>
            <span className="btn btn-default icon icon-cancel-squared pull-right close-bar" onClick={this.closeRoomSelect.bind(this)}>
            </span>
          </div>
          <div className="select-room">
            <div className="invite-text">Invite to: </div>
            <select onChange={this.changeRoom.bind(this)}>
              <option selected disabled hidden> Select a room: </option>
              {mapRooms}
            </select>
            <div className="action-buttons">
              <button onClick={this.inviteToRoom.bind(this)} className="invite-button">Invite</button>
              <button onClick={this.closeRoomSelect.bind(this)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToprops = (state) => state.roomReducer;
export default connect(mapStateToprops)(withRouter(RoomSelect));
