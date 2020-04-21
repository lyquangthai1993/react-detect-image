import * as AUTH_ACTION_TYPES from './authActionTypes';

export const login_success = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
  };
};


export const add_profile = (profile) => {
  return {
    type: AUTH_ACTION_TYPES.ADD_PROFILE,
    payload: profile,
  };
};

export const remove_profile = () => {
  return {
    type: AUTH_ACTION_TYPES.REMOVE_PROFILE,
  };
};
