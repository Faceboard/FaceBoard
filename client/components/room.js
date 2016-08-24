import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RoomList from './roomList';
import FriendsList from './friendsList';
import RoomChat from './roomChat';
import RoomChatInput from './roomChatInput';
import Sidebar from './sidebar';
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
        <div className="mainHeader">
          {'Chat Room ' + global.localStorage.currentRoom}
           <span className="btn btn-default pull-right icon icon-home" onClick={this.leaveRoom.bind(this)}>
           </span>
           <div className="pull-right">
             <div className="users-search">
               <Users />
             </div>
           </div>
        </div>
        <Sidebar />
        <RoomChat />
      </div>
    );
  }
};


const mapStateToProps = (state) => state.roomChatReducer;
export default connect(mapStateToProps)(withRouter(Room));
