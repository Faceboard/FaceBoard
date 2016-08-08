import reducer from '../reducers/combine.js';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
  return createStore(reducer, preloadedState, applyMiddleware(logger(), thunk));
}
