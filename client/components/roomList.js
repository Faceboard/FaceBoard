import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRoomsForUser, deleteRoom, addRooms } from '../actions/room';

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

  render() {
    const { rooms } = this.props;
    const mapRooms = rooms.map(room =>
      <div>
        <li key={room.id} >{room.roomname}</li>
        <button onClick={this.removeRoom.bind(this)} value={room.roomname}></button>
      </div>
    );
    if (!rooms.length) {
      return (
        <div id="rooms-list">Loading</div>
      );
    }

    return (
      <div id="rooms-list">
        <ul className="list-group">
          <li className="list-group-header">
            <h4>Rooms</h4>
          </li>
          <textarea id='roomlist-input' placeholder='Make a chat room' onKeyPress={this.addRoom.bind(this)}/>
        </ul>
        {mapRooms}
      </div>
    );
  }
}

const mapStateToProps = state => state.roomReducer;
export default connect(mapStateToProps)(withRouter(RoomList));
