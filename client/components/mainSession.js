import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Video from './videos';
import { modeChange, toggleDiv } from '../actions/action';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';
import { fetchWhiteboard } from '../actions/whiteboardConfig';
import socket from '../sync';
import { ProgressCircle } from 'react-desktop/macOs';
import ReactGridLayout from 'react-grid-layout';

class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(fetchFirepad(this.props.firepad.mode));
    var dispatch = this.props.dispatch;
    socket.on('userHasSentWBID', function (id) {
      dispatch(fetchWhiteboard(id));
    })
  }

  toggleEditor (e) {
    if (e.target.id === 'codeshareTab') {
      this.props.dispatch(toggleDiv(true));
    } else {
      this.props.dispatch(toggleDiv(false));
    }
  }

  changeMode (e) {
    document.getElementById('firepad').innerHTML = '';
    this.props.dispatch(fetchFirepad(e.target.value));
  }

  render () {
    var layout = [
      {i: 'syntax', x: 5, y: 0, w: 20, h: 3, static: true},
      {i: 'code', x: 5, y: 0, w: 25, h: 40},
      {i: 'board', x: 30, y: 3, w: 25, h: 40},
      {i: 'video', x: 55, y: 3, w: 10, h: 20}
    ];
    return (
      <ReactGridLayout className="layout" layout={layout} cols={100} rowHeight={1} width={window.innerWidth*1.5} verticalCompact={false}>
        <select key={'syntax'} id="cmMode" className="form-control" onChange={this.changeMode.bind(this)}>
          <option value="javascript">javascript</option>
          <option value="jsx">jsx</option>
          <option value="css">css</option>
          <option value="htmlmixed">html - mixed</option>
          <option value="php">php</option>
          <option value="ruby">ruby</option>
          <option value="python">python</option>
          <option value="markdown">markdown</option>
          <option value="sass">sass</option>
          <option value="sql">sql</option>
        </select>
        <div className="gridBox" key={'video'}><Video /></div>
        <div className="gridBox" key={'code'} id="firepad"></div>
        {this.props.whiteboard.whiteboardId ?
            <div className="gridBox" key={'board'}><iframe id="whiteboard" src={"https://www.twiddla.com/api/start.aspx?sessionid=" + this.props.whiteboard.whiteboardId + "&hide=chat,bottomtray,url,invite,profile,voice,welcome,etherpad,documents,images,email,math,roomsettings,logo&autostart=true"}></iframe></div> :
            <div className="gridBox" key={'board'}><ProgressCircle className="progresscircle" size={40}/></div>}
      </ReactGridLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firepad: state.firepadReducer,
    whiteboard: state.whiteboardReducer
  };
};

export default connect(mapStateToProps)(withRouter(MainSession));
