import * as CREATE_HIRE_ACTION_TYPES from "./createHireDataActionTypes";
import moment from "moment";
import _ from "lodash";

export const dataRequest = {
  hireLine: [], // List product is selected after filtered bundle or category
  clientWeight: "0.0",
  startDate: moment().toDate(),
  hireStatusId: 1,
  locationId: -1,
  customerId: -1,
};
export const initialCreateHireState = {
  titlePage: "Product selection",
  groupSelected: {}, // Item from bundle or category is selecting to show productList
  productList: [], // List product is filtered when select bundle or category
  // productSelected: productTempAdded,// !THIS USE TO TEST
  step: 1,
  errors: [],
  hireId: "",
  hireDetail: {},
  dataRequest,
};

export const CreateHireReducer = (state, action) => {
  console.log("state----------------------", state);
  console.log("action type----------------", action.type);
  console.log(
    "initialCreateHireState-----",
    initialCreateHireState.dataRequest.hireLine
  );

  switch (action.type) {
    case CREATE_HIRE_ACTION_TYPES.CLEAR_CREATE_HIRE_DATA: {
      return { ...initialCreateHireState };
    }

    case CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_CHANGE_FIELD: {
      let temp = { ...state };
      temp[action.field] = action.value;

      return { ...temp };
    }
    case CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_SELECT_GROUP:
      return {
        ...state,
        groupSelected: action.payload.groupSelected,
        productList: action.payload.productList,
        step: 1,
        titlePage: "Product selection",
      };
    case CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_SELECT_PRODUCT:
      return {
        ...state,
        step: 2,
        titlePage: "Selected products",
      };

    case CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_UPDATE_PRODUCT_SELECTED: {
      let temp = _.cloneDeep(state);
      temp["dataRequest"].hireLine = action.payload.hireLine;
      // temp["titlePage"] = "Hire details";
      return temp;
    }

    case CREATE_HIRE_ACTION_TYPES.CREATE_HIRE_DATA_SAVE_DATA_REQUEST: {
      let temp = _.cloneDeep(state);
      temp["dataRequest"] = { ...temp["dataRequest"], ...action.data };

      return { ...temp };
    }
    default:
      return {
        ...state,
        errors: "action.type not found",
      };
  }
};
