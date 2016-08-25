import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRoomMessages, getRoomsForUser, deleteRoom, addRooms } from '../actions/room';
import socket from '../sync';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomsForUser());
  }

  removeRoom (e) {
    deleteRoom(e.target.dataset['roomname']);
  }

  addRoom (e) {
    if (e.which === 13 && !e.shiftKey) {
      let input = document.getElementById('roomlist-input');
      this.props.dispatch(addRooms(input.value));
      input.value = '';
    }
  }

  changeRooms (e) {
    e.preventDefault();
    const { router } = this.props;
    global.localStorage.currentRoom = e.target.dataset['roomname'];
    let roomObj = {
      roomname: global.localStorage.currentRoom,
    };
    socket.emit('join room', roomObj);
    router.replace('/room');
    this.props.dispatch(getRoomMessages(global.localStorage.currentRoom));
  }

  goToLobby () {
    const { router } = this.props;
    global.localStorage.currentRoom = '';
    router.replace('/');
  }

  showRoomAdd (e) {
    this.refs.roomInput.classList.toggle('rooms-list-input-show');
  }

  render () {
    const { rooms } = this.props;
    const mapRooms = rooms.map(room =>
      <li className="list-group-item" key={room.id} onClick={this.changeRooms.bind(this)} data-roomname={room.roomname}>
        <div className="media-body pull-left">
          <strong>{room.roomname}</strong>
        </div>
        <span className="btn btn-default pull-right icon icon-minus" onClick={this.removeRoom.bind(this)} data-roomname={room.roomname}></span>
      </li>
    );
    if (!rooms.length) {
      return (
        <div className="rooms-list">
          <ul className="list-group">
            <li className="list-group-header">
              <div><h4>Rooms</h4></div>
                <span className="btn btn-default icon icon-plus pull-right" onClick={this.showRoomAdd.bind(this)}></span>
            </li>
            <div className="rooms-list-input" ref="roomInput">
              <input className="form-control" id='roomlist-input' placeholder='Make a chat room' onKeyPress={this.addRoom.bind(this)}/>
            </div>
            <li className="list-group-item" onClick={this.goToLobby.bind(this)}>
              <div className="media-body pull-left">
                <strong>Lobby</strong>
              </div>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div className="rooms-list">
        <ul className="list-group">
          <li className="list-group-header room-header">
            <h4 id="room-title">Rooms</h4>
            <span className="btn btn-default icon icon-plus pull-right" onClick={this.showRoomAdd.bind(this)}></span>
          </li>
          <li>
            <div className="rooms-list-input" ref="roomInput">
              <input className="form-control" id='roomlist-input' placeholder='Make a chat room' onKeyPress={this.addRoom.bind(this)}/>
            </div>
          </li>
          {mapRooms}
          <li className="list-group-item" onClick={this.goToLobby.bind(this)}>
            <div className="media-body pull-left">
              <strong>Lobby</strong>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => state.roomReducer;
export default connect(mapStateToProps)(withRouter(RoomList));
