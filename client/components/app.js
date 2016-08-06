import React from 'react';
import { Link } from 'react-router';


const App = () => (
  <div>
    <h1>Welcome to Faceboard!</h1>
    <Link to="/signup"><button>Sign Up!</button></Link>
  </div>
);



export default App;