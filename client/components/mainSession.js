import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
    this.props.dispatch(fetchFirepad(this.props.firepadReducer.mode));
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
    // this is terrible and should not be done, but there's something fundamental missing in
    // this logic and this is the easiest workaround in the short term
    // god have mercy on my soul for mixing direct and virtual dom manipulations
    document.getElementById('firepad').innerHTML = '';
    this.props.dispatch(fetchFirepad(e.target.value));
  }

  render () {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'b', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 4}
    ];
    return (
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={200} width={2000}>
        <div className="gridBox" id="firepad" key={'b'}></div>
        {this.props.whiteboardReducer.whiteboardId ?
            <div className="gridBox" key={'c'}><iframe id="whiteboard" src={"https://www.twiddla.com/api/start.aspx?sessionid=" + this.props.whiteboardReducer.whiteboardId + "&hide=chat,bottomtray,url,invite,profile,voice,welcome,etherpad,documents,images,email,math,roomsettings,logo&autostart=true"}></iframe></div> :
            <div className="gridBox" key={'c'}><ProgressCircle className="progresscircle" size={40}/></div>}
      </ReactGridLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firepadReducer: state.firepadReducer,
    whiteboardReducer: state.whiteboardReducer
  };
};
export default connect(mapStateToProps)(withRouter(MainSession));


    // <div className="tab-group">
    //       <div className={ !this.props.firepadReducer.hidden ? 'tab-item active' : 'tab-item' } id="codeshareTab" onClick={this.toggleEditor.bind(this)}>
    //         Codeshare
    //       </div>
    //       <div className={ this.props.firepadReducer.hidden ? 'tab-item active' : 'tab-item' } id="whiteboardTab" onClick={this.toggleEditor.bind(this)}>
    //         Whiteboard
    //       </div>
    //     </div>
    //     <div id="firepadContainer" className={this.props.firepadReducer.hidden ? 'hidden' : 'open'}>
    //       <select id="cmMode" className="form-control" onChange={this.changeMode.bind(this)}>
    //         <option value="javascript">javascript</option>
    //         <option value="jsx">jsx</option>
    //         <option value="css">css</option>
    //         <option value="htmlmixed">html - mixed</option>
    //         <option value="php">php</option>
    //         <option value="ruby">ruby</option>
    //         <option value="python">python</option>
    //         <option value="markdown">markdown</option>
    //         <option value="sass">sass</option>
    //         <option value="sql">sql</option>
    //       </select>
    //       <div id="firepad"></div>
    //     </div>
    //       { this.props.whiteboardReducer.whiteboardId ?
    //         <iframe id="whiteboard"
    //                 className={!this.props.firepadReducer.hidden ? "hidden" : "open"}
    //                 src={"https://www.twiddla.com/api/start.aspx?sessionid=" + this.props.whiteboardReducer.whiteboardId + "&hide=chat,bottomtray,url,invite,profile,voice,welcome,etherpad,documents,images,email,math,roomsettings,logo&autostart=true"}></iframe> :
    //         <div id="whiteboard" className={!this.props.firepadReducer.hidden ? "hidden" : "open"}><ProgressCircle className="progresscircle" size={40}/></div>}




