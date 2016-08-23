import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ProgressCircle } from 'react-desktop/macOs';
import { getRoomMessages } from '../actions/room';
import RoomChatInput from './roomChatInput';
import Message from './message';



class RoomChat extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomMessages(global.localStorage.roomid));
  }

  render () {
    const { roomMsgs } = this.props;
    console.log('this is roomMsgs', roomMsgs);
    if (!roomMsgs) {
      <div className="progresscircle">
        <ProgressCircle size={40}/>
      </div>
    }

    return (
      <div className="chatBox">
        <table className="table-striped">
          <tbody>
            {roomMsgs.map(message => <Message key={message.id} userid={message.id} user={message.username} text={message.text} timestamp={message.createdAt}/>)}
          </tbody>
        </table>
        <RoomChatInput />
      </div>
    );
  }
};


const mapStateToProps = (state) => state.roomChatReducer
export default connect(mapStateToProps)(withRouter(RoomChat));
