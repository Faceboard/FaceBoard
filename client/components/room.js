import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RoomList from './roomList';
import FriendsList from './friendsList';
import RoomChat from './roomChat';
import HeaderIcons  from './headerIcons';
import { getRoomMessages } from '../actions/room';



class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let currentRoom = global.localStorage.currentRoom || '';
    return(
      <div className="lobby">
        <div className="mainHeader">
          {currentRoom}
          <HeaderIcons />
        </div>
        <RoomList />
        <FriendsList />
      </div>
    );
  }
};


const mapStateToProps = (state) => state.roomChatReducer;
export default connect(mapStateToProps)(withRouter(Room));
