import toDoApi from '../api/toDoApi';
import * as types from './actionTypes';

export function loadToDosSuccess(todos) {
  return {
    type: types.LOAD_TODOS_SUCCESS,
    todos,
  };
}

export function loadToDos() {
  return function(dispatch) {
    return toDoApi.getAllToDos().then(todos => {
      dispatch(loadToDosSuccess(todos));
    }).catch(error => {
      throw(error);
    });
  };
}
