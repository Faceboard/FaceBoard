import React from 'react';
import { Link } from 'react-router';


const Signin = () => (
  <div>
    <form>
      <h2> Sign in! </h2>
      <input name="username" value="username" />
      <input type="password" name="password" value="password" />
      <button>Sign in</button><br />
      <Link to="/"><button> Back to homepage </button></Link>
    </form>
  </div>
)

export default Signin;