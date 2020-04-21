import * as ACTION_TYPES from "./actionTypes";

export const changeField = (field, value) => {
  return {
    type: ACTION_TYPES.CHANGE_FIELD,
    field, value
  };
};


export const changeParamsSearch = (field, value) => {
  return {
    type: ACTION_TYPES.CHANGE_PARAMS_SEARCH,
    field, value
  };
};

export const clearSearch = () => {
  return {
    type: ACTION_TYPES.CLEAR_SEARCH,
  };
};

