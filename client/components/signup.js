import React from 'react';
import { Link } from 'react-router';


const Signup = () => (
  <form>
    <h2> Sign Up! </h2>
    <input value="username" name="username" />
    <input type="password" value="password" />
    <button>Sign up</button><br />
    <Link to="/"><button> Back to homepage </button></Link>
  </form>
)



export default Signup;