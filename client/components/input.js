import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeMessageText } from '../actions/message';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  changeMessage(e) {
    this.props.dispatch(changeMessageText(e.target.name, e.target.value));
  }

  render() {
    return (
      <div id="inputMessage">
        <form>
          <input type="text" name="messageText" onChange={this.changeMessage.bind(this)}/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state.messageReducer;
export default connect(mapStateToProps)(withRouter(Input));