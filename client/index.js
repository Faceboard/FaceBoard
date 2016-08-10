import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { getToken } from './auth';
import axios from 'axios';
import App from './components/app';
import Signup from './components/signup';
import Signin from './components/signin';
import Lobby from './components/lobby';
import Session from './components/session';
import configureStore from './store/configureStore';

//starter page - necessary for webpack. Put whatever desired here.

axios.interceptors.request.use(function (config) {
  config.headers['x-access-token'] = getToken();
  return config;
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={hashHistory} >
      <Route path="/" component={Lobby}/>
      <Route path="/auth" component={App}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/signin" component={Signin}/>
      <Route path="/session" component={Session}/>
    </Router>
  </Provider>
,document.getElementById('root'));
