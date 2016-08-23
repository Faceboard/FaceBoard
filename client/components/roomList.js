import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRoomsForUser, deleteRoom, addRooms } from '../actions/room';
import socket from '../sync';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomsForUser());
  }

  removeRoom (e) {
    deleteRoom(e.target.value);
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
    global.localStorage.roomid = e.target.dataset['roomId'];
    global.localStorage.currentRoom = e.target.dataset['roomname'];
    let roomObj = {
      roomname: global.localStorage.currentRoom
    };
    socket.emit('join room', roomObj);
    router.replace('/room');
  }

  goToLobby () {
    const { router } = this.props;
    router.replace('/');
  }

  render() {
    const { rooms } = this.props;
    const mapRooms = rooms.map(room =>
      <div>
        <li key={room.id} onClick={this.changeRooms.bind(this)} data-room-id={room.id} data-roomname={room.roomname}>{room.roomname}</li>
        <button onClick={this.removeRoom.bind(this)} value={room.roomname}></button>
      </div>
    );
    if (!rooms.length) {
      return (
        <div id="rooms-list">
          <ul className="list-group">
            <li className="list-group-header">
              <h4>Rooms</h4>
            </li>
            <input id='roomlist-input' placeholder='Make a chat room' onKeyPress={this.addRoom.bind(this)}/>
          </ul>
        </div>
      );
    }

    return (
      <div id="rooms-list">
        <ul className="list-group">
          <li className="list-group-header">
            <h4>Rooms</h4>
          </li>
          <input id='roomlist-input' placeholder='Make a chat room' onKeyPress={this.addRoom.bind(this)}/>
        </ul>
        {mapRooms}
        <div>
          <li onClick={this.goToLobby.bind(this)}>Lobby</li>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.roomReducer;
export default connect(mapStateToProps)(withRouter(RoomList));
