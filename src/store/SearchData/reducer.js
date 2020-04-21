import * as ACTION_TYPES from "./actionTypes";
import _ from "lodash";

export const initialSearchDataState = {
  isSearching: false, //status of search,
  params: {
    pageSize: 20,
    search: "",
    includeOutsideCatchment: true
  }, //params is query string for API
  results: [], //!results after call API, current will handle hard code to set results,
  error: {}
};

export const SearchDataReducer = (state = initialSearchDataState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_FIELD: {
      let tempState = { ...state };
      tempState[action.field] = action.value;
      return tempState;
    }
    case ACTION_TYPES.CHANGE_PARAMS_SEARCH: {
      let tempState = { ...state };
      if (_.isObject(action.value)) {
        tempState["params"] = action.value;
      } else {
        let { params = {} } = tempState;
        params[action.field] = action.value;
        tempState["params"] = params;
      }
      return tempState;
    }

    case ACTION_TYPES.CLEAR_SEARCH: {
      return initialSearchDataState;
    }
    default:
      return {
        ...state,
        errors: "action.type not found"
      };
  }
};
