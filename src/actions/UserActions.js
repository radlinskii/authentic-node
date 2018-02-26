import userApi from '../api/userApi';
import * as types from './actionTypes';

export function loadUserSuccess(user) {
  return {
    type: types.LOAD_USER_SUCCESS,
    user,
  };
}

export function loadUser() {
  return function(dispatch) {
    return userApi.getUser().then(user => {
      dispatch(loadUserSuccess(user));
    }).catch(error => {
      throw(error);
    });
  };
}
