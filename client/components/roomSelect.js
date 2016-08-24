import React from 'react';
import { connect } from 'react-redux';
import { getRoomsForUser } from '../actions/room';


class RoomSelect extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomsForUser());
  }

  render () {
    const { rooms } = this.props;
    const mapRooms = rooms.map(r =>
      <option key={r.id} value={r.roomname}>
        {r.roomname}
      </option>
    )
    return (
      <div>
        <div className="room-select">
          <div className="upper-div">

          </div>
          <form onSumbit={this.inviteToRoom.bind(this)}>
            <select>
            </select>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToprops = (state) => state.roomReducer;
export default connect(mapStateToprops)(withRouter(RoomSelect));
