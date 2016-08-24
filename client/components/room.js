import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RoomList from './roomList';
import FriendsList from './friendsList';
import RoomChat from './roomChat';
import RoomChatInput from './roomChatInput';
import Sidebar from './sidebar';
import RoomSelect from './roomSelect';
import { getRoomMessages } from '../actions/room';
import Users from './users';

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  leaveRoom () {
    const { router } = this.props;
    global.localStorage.currentRoom = 'lobby';
    router.replace('/');
  }

  render () {
    let currentRoom = global.localStorage.currentRoom || '';
    return(
      <div className="lobby">
        <Sidebar />
        <RoomChat />
        <RoomSelect />
      </div>
    );
  }
};


const mapStateToProps = (state) => state.roomChatReducer;
export default connect(mapStateToProps)(withRouter(Room));
