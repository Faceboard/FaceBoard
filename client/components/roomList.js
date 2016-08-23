import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRoomsForUser, deleteRoom } from '../actions/room';

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

  render() {
    const { rooms } = this.props;
    const mapRooms = rooms.map(room =>
      <div>
        <li key={room.id} value={room.roomid}>{room.roomname}</li>
        <button onClick={this.removeRoom.bind(this)} value={room.roomname}></button>
      </div>
    );
    if (!rooms.length) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <div>
        <ul className="list-group">
          <li className="list-group-header">
            <h4>Rooms</h4>
          </li>
        </ul>
        {mapRooms}
      </div>
    );
  }
}

const mapStateToProps = state => state.roomReducer;
export default connect(mapStateToProps)(withRouter(RoomList));
