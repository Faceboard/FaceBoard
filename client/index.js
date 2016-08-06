import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import App from './components/app';
import Signup from './components/signup';
import Signin from './components/signin';

//starter page - necessary for webpack. Put whatever desired here.

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={App}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/signin" component={Signin}/>
  </Router>
,document.getElementById('root'));