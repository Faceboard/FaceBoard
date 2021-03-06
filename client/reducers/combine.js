import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import inputReducer from './inputReducer';
import firepadReducer from './firepadReducer';
import pchatReducer from './pchatReducer';
import whiteboardReducer from './whiteboardReducer';
import roomChatReducer from './roomChatReducer';
import roomReducer from './roomReducer';

export default combineReducers({
  authReducer,
  userReducer,
  chatReducer,
  inputReducer,
  firepadReducer,
  pchatReducer,
  whiteboardReducer,
  roomChatReducer,
  roomReducer
});
