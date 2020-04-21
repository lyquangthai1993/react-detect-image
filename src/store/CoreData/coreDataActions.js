import * as CORE_DATA_ACTION_TYPES from "./coreDataActionTypes";

export const plusCount = () => {
  return {
    type: CORE_DATA_ACTION_TYPES.CORE_DATA_PLUS_COUNT,
    
  };
};

export const minusCount = () => {
  return {
    type: CORE_DATA_ACTION_TYPES.CORE_DATA_MINUS_COUNT,
    
  };
};
