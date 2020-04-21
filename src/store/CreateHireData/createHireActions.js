import * as CREATE_HIRE_ACTION_TYPES from "./createHireDataActionTypes";

export const changeField = (field, value) => {
  return {
    type: CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_CHANGE_FIELD,
    field, value
  };
};

export const clearCreateHireData = () => {
  return {
    type: CREATE_HIRE_ACTION_TYPES.CLEAR_CREATE_HIRE_DATA
  };
};

export const selectGroup = (group, product) => {
  return {
    type: CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_SELECT_GROUP,
    payload: {
      groupSelected: group,
      productList: product
    }
  };
};

export const updateProductSelected = (productSelected) => {
  return {
    type: CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_UPDATE_PRODUCT_SELECTED,
    payload: {
      hireLine: productSelected
    }
  };
};

export const saveDataRequest = (data) => {
  return {
    type: CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_SAVE_DATA_REQUEST,
    data
  };
};
