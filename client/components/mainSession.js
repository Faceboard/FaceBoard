import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { modeChange, toggleDiv } from '../actions/action';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';
import { fetchWhiteboard } from '../actions/whiteboardConfig';

class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(fetchFirepad(this.props.firepadReducer.mode));
    this.props.dispatch(fetchWhiteboard());
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
    return (
      <div id="mainSession">
        <div className="tab-group">
          <div className={ !this.props.firepadReducer.hidden ? 'tab-item active' : 'tab-item' } id="codeshareTab" onClick={this.toggleEditor.bind(this)}>
            Codeshare
          </div>
          <div className={ this.props.firepadReducer.hidden ? 'tab-item active' : 'tab-item' } id="whiteboardTab" onClick={this.toggleEditor.bind(this)}>
            Whiteboard
          </div>
        </div>
        <div id="firepadContainer" className={this.props.firepadReducer.hidden ? 'hidden' : 'open'}>
          <select id="cmMode" className="form-control" onChange={this.changeMode.bind(this)}>
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
          <div id="firepad"></div>
        </div>
          { this.props.whiteboardReducer.whiteboardId ?
            <iframe id="whiteboard"
                    className={!this.props.firepadReducer.hidden ? "hidden" : "open"}
                    src={"https://www.twiddla.com/api/start.aspx?sessionid=" + this.props.whiteboardReducer.whiteboardId + "&hide=chat,bottomtray,url,invite,profile,voice,welcome,etherpad,documents,images,email,math,roomsettings,logo&autostart=true"}></iframe> :
            <div id="whiteboard" className={!this.props.firepadReducer.hidden ? "hidden" : "open"}>Whiteboard is loading...</div> }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    firepadReducer: state.firepadReducer,
    whiteboardReducer: state.whiteboardReducer
  };
};

export default connect(mapStateToProps)(withRouter(MainSession));
