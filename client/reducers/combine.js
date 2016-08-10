import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import inputReducer from './inputReducer';

export default combineReducers({
  authReducer,
  userReducer,
  chatReducer,
  inputReducer
})
