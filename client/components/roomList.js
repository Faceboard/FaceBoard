import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRoomsForUser } from '../actions/room';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomsForUser());
  }

  render() {
    const { rooms } = this.props;
    console.log(rooms);
    const mapRooms = rooms.map(room =>
      <li>{room.roomname}</li>
    );
    if (!rooms.length) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <div>
        hello World
        {mapRooms}
      </div>
    );
  }
}

const mapStateToProps = state => state.roomReducer;
export default connect(mapStateToProps)(withRouter(RoomList));
