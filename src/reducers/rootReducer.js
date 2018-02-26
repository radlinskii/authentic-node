import {combineReducers, } from 'redux';
import todos from './toDoReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  // short hand property names
  todos,
  user,
});

export default rootReducer;
