import React from 'react';
import { Link } from 'react-router';


class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="authPage">
        <div className="mainHeader">
          Welcome to Faceboard!
        </div>
        <div className="centerAuth">
          <Link to="/signup"><button className="btn btn-default">Sign Up!</button></Link>
          <Link to="/signin"><button className="btn btn-default">Sign In!</button></Link>
        </div>
      </div>
    );
  }
}


export default App;
