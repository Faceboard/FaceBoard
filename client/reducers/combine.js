import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  authReducer,
  userReducer,
  chatReducer,
  messageReducer
})
