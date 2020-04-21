import * as LOOKUP_DATA_ACTION_TYPES from "./lookupDataActionTypes";

export const updateProductStore = (product) => {
  return {
    type: LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_UPDATE_PRODUCT,
    product
  };
};

export const updateCollections = (data) => {
  return {
    type: LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_UPDATE_COLLECTIONS,
    data
  };
};

export const changeField = (field, value) => {
  return {
    type: LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_CHANGE_FIELD,
    field, value
  };
};
