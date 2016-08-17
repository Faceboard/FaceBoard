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
    var aww = new AwwBoard('#whiteboard', {
      apiKey: '4e0bde7f-d2c2-438f-a2af-a3cd3ab506ae',
      autoJoin: true,
      boardLink: 'face-board-awwapp',
      sizes: [3, 5, 8, 13, 20],
      fontSizes: [10, 12, 16, 22, 30],
      menuOrder: ['colors', 'sizes', 'tools', 'admin',
        'utils'],
      tools: ['pencil', 'eraser', 'text', 'image', 'undo', 'trash'],
      colors: [ "#000000", "#f44336", "#4caf50", "#2196f3",
        "#ffc107", "#9c27b0",     "#e91e63", "#795548"],
      defaultColor: "#000000",
      defaultSize: 8,
      defaultTool: 'pencil'
    });

    const { mode } = this.props;
    this.props.dispatch(fetchFirepad(this.props.mode));
  }

  changeMode (e) {
    // this is terrible and should not be done, but there's something fundamental missing in
    // this logic and this is the easiest workaround in the short term
    // god have mercy on my soul for mixing direct and virtual dom manipulations
    document.getElementById('firepad').innerHTML = '';
    this.props.dispatch(fetchFirepad(e.target.value));
  }

  toggleEditor () {
    console.log("made it to toggleEditor")
    this.props.dispatch(toggleDiv(this.props.hidden));
  }

  render () {
    return (
      <div id="mainSession">
        <div id="firepad" className={!this.props.hidden ? 'hidden' : 'open'}>
        </div>
        <div id="whiteboard" className={this.props.hidden ? 'hidden' : 'open'}>
        </div>
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






// import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
// import { modeChange, toggleDiv } from '../actions/action';
// import { configFirebase, fetchFirepad, deleteFirepad } from '../actions/firebaseConfig';

// class MainSession extends React.Component {
//   constructor (props) {
//     super(props);

//     this.state = {
//       showMe: false
//     };

//     this.swapWindow = this.swapWindow.bind(this);
//   }

//   componentDidMount () {
//     var aww = new AwwBoard('#whiteboard', {
//       apiKey: '4e0bde7f-d2c2-438f-a2af-a3cd3ab506ae',
//       autoJoin: true,
//       boardLink: 'face-board-awwapp',
//       sizes: [3, 5, 8, 13, 20],
//       fontSizes: [10, 12, 16, 22, 30],
//       menuOrder: ['colors', 'sizes', 'tools', 'admin',
//         'utils'],
//       tools: ['pencil', 'eraser', 'text', 'image', 'undo', 'trash'],
//       colors: [ "#000000", "#f44336", "#4caf50", "#2196f3",
//         "#ffc107", "#9c27b0",     "#e91e63", "#795548"],
//       defaultColor: "#000000",
//       defaultSize: 8,
//       defaultTool: 'pencil'
//     });

//     const { mode } = this.props;
//     this.props.dispatch(fetchFirepad(this.props.mode));
//   }

//   changeMode (e) {
//     // this is terrible and should not be done, but there's something fundamental missing in
//     // this logic and this is the easiest workaround in the short term
//     // god have mercy on my soul for mixing direct and virtual dom manipulations
//     document.getElementById('firepad').innerHTML = '';
//     this.props.dispatch(fetchFirepad(e.target.value));
//   }

//   // toogleEditor () {
//   //   this.props.dispatch(toggleDiv());


//   //   <button onClick={this.toggleEditor.bind(this)} >click me</button>
//   //     <div className={this.props.hidden ? 'hidden' : 'open'}></div>
//   //     <div id="firepad" className={this.props.hidden}>
//   //   </div>
//   // }

//   swapWindow () {
//     this.setState({ showMe : !this.state.showMe });
//   }

//   render () {

//     if(this.state.showMe) {

//       return (
//         <div id="mainSession">
//           <button onClick={this.swapWindow}></button>
//           <div id="firepad">
//           </div>
//           <select id="cmMode" onChange={this.changeMode.bind(this)}>
//             <option value="javascript">javascript</option>
//             <option value="jsx">jsx</option>
//             <option value="css">css</option>
//             <option value="htmlmixed">html - mixed</option>
//             <option value="php">php</option>
//             <option value="ruby">ruby</option>
//             <option value="python">python</option>
//             <option value="markdown">markdown</option>
//             <option value="sass">sass</option>
//             <option value="sql">sql</option>
//           </select>
//         </div>
//       );

//     } else {

//       return (
//         <div id="mainSession">
//           <button onClick={this.swapWindow}></button>
//           <div id="whiteboard">
//           </div>
//         </div>
//       );
//     }



//   }
// }

// const mapStateToProps = state => state.firepadReducer;
// export default connect(mapStateToProps)(withRouter(MainSession));