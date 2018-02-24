import {combineReducers, } from 'redux';
import todos from './toDoReducer';

const rootReducer = combineReducers({
  // short hand property names
  todos,
});

export default rootReducer;
