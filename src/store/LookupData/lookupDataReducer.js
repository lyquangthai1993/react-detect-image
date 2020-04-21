import * as LOOKUP_DATA_ACTION_TYPES from "./lookupDataActionTypes";

export const initialLookupDataState = {
  collections: {
    product: [],
    category: [],
    warehouse: [],
    vehicle: [],
    bundle: []
  },
  groupSelected: "",
  step: 1,
  errors: []
};

export const LookupDataReducer = (state, action) => {
  switch (action.type) {
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_RESET:
      return initialLookupDataState;
    
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_CHANGE_FIELD: {
      let temp = { ...state };
      temp[action.field] = action.value;
      return temp;
    }
    
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_LOADINGS_STARED:
      return {
        ...state,
        collections: initialLookupDataState.collections,
        errors: []
      };
    
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_LOADING_FINISHED: {
      let temp = { ...state };
      let collections = { ...temp.collections };
      Object.keys(action.payload).map(key => {
        collections[key] = action.payload[key];
        return action.payload[key];
      });
      return {
        ...state,
        collections,
        errors: action.payload.errors
      };
    }
    
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_SELECT_GROUP:
      return {
        ...state,
        groupSelected: action.payload.groupSelected,
        collections: {
          ...state.collections,
          product: action.product
        },
        step: 2
      };
    
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_UPDATE_PRODUCT:
      return {
        ...state,
        collections: {
          ...state.collections,
          product: action.product
        }
      };
  
  
    case LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_UPDATE_COLLECTIONS:
      let temp = { ...state };
      let collections = { ...temp.collections };
      Object.keys(action.data).map(key => {
        collections[key] = action.data[key];
        return action.data[key];
      });
      return {
        ...state,
        collections
      };
      
    default:
      return {
        ...state,
        errors: "action.type not found"
      };
  }
};
