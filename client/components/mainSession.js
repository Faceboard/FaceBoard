import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { modeChange, toggleDiv } from '../actions/action';
import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';

class MainSession extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { mode } = this.props;
    this.props.dispatch(fetchFirepad(this.props.mode));
  }

  toggleEditor () {
    console.log('made it to toggleEditor');
    this.props.dispatch(toggleDiv(this.props.hidden));
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
        <div id="firepad" className={this.props.hidden ? 'hidden' : 'open'}></div>
        <iframe id="whiteboard"
                className={!this.props.hidden ? 'hidden' : 'open'}
                src="https://www.twiddla.com/api/start.aspx?sessionid=2796834&hide=chat,bottomtray,url,invite,profile,voice,welcome,etherpad,documents,images,email,math,roomsettings,logo&autostart=true"></iframe>
        <button onClick={this.toggleEditor.bind(this)} >click me</button>
        <select id="cmMode" onChange={this.changeMode.bind(this)}>
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
      </div>
    );
  }
}

const mapStateToProps = state => state.firepadReducer;
export default connect(mapStateToProps)(withRouter(MainSession));
