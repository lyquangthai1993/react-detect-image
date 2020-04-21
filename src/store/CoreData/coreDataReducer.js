import * as CORE_DATA_ACTION_TYPES from "./coreDataActionTypes";

export const initialCoreDataState = {
  collections: {
  },
  countLoading: 0,
  errors: []
};

export const CoreDataReducer = (state, action) => {
  
  switch (action.type) {
    
    case CORE_DATA_ACTION_TYPES.CORE_DATA_LOADINGS_STARED:
      return {
        ...state,
        collections: { hire: null, hireLine: null },
        errors: []
      };
    
    case CORE_DATA_ACTION_TYPES.CORE_DATA_LOADING_FINISHED:
      return {
        ...state,
        collections: {
          hire: action.payload.hire,
          hireLine: action.payload.hireLine
        },
        errors: action.payload.errors
      };
    
    case CORE_DATA_ACTION_TYPES.CORE_DATA_PLUS_COUNT: {
      const temp = { ...state };
      temp.countLoading = temp.countLoading + 1;
      return temp;
    }
    
    case CORE_DATA_ACTION_TYPES.CORE_DATA_MINUS_COUNT: {
      const temp = { ...state };
      temp.countLoading = temp.countLoading - 1;
      return temp;
    }
    
    default:
      return {
        ...state,
        errors: "action.type not found"
      };
  }
};
