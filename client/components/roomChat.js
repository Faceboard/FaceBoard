import React from 'react';
import { connect } from 'react-redux';
import { ProgressCircle } from 'react-desktop/macOs';


class RoomChat extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(getRoomMessages(global.localStorage.roomid));
  }

  render () {
    const { roomMsgs } = this.props;
    if (!roomMsgs) {
      <div className="progresscircle">
        <ProgressCircle size={40}/>
      </div>
    }

    return (
      <div className="chatBox">
        <table className="table-striped">
          <tbody>
            {roomMsgs.map(message => <Message key={message.id} userid={message.id} user={message.user} text={message.text} timestamp={message.createdAt}/>)}
          </tbody>
        </table>
      </div>
    );
  }
};


const mapStateToProps = (state) => state.roomChatReducer
export default connect(mapStateToProps)(withRouter(RoomChat));