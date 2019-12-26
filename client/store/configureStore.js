import reducer from '../reducers/combine.js';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore (preloadedState) {
  return createStore(reducer, preloadedState, applyMiddleware(thunk));
}
