import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function toDoReducer(state = initialState.todos, action) {
  switch (action.type) {
  case types.LOAD_TODOS_SUCCESS:
    return action.todos;
  default:
    return state;
  }
}
