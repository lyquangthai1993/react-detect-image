import _ from "lodash";

export const DEBOUNCE_TIME_SEARCH = 1500;
export const TIMEOUT_REQUEST = 15000;

export const ItemStatus = Object.freeze({
  AVAILABLE: 1,
  ON_HIRE: 2,
  PICK_UP: 3,
  TRANSFER: 4,
  UNAVAILABLE: 5,
  FAULTY: 6,
  DIRTY: 7,
  MISMATCH: 8
});

export const LocationType = Object.freeze({
  WAREHOUSE: "+2",
  VEHICLE: "+4",
  HIRE: "+3",
  CONSIGNMENT: "+5"
});
export const ItemStatusInvert = _.invert(ItemStatus);
export const LocationTypeInvert = _.invert(LocationType);

// console.log("LocationType:", LocationType);
// console.log("LocationTypeInvert:", LocationTypeInvert);