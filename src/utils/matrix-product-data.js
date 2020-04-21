import { ItemStatus, LocationTypeInvert } from "./constants";

const matrixProductData = [
  [ItemStatus.AVAILABLE, LocationTypeInvert, [14, 18, 25, 17]],
  [ItemStatus.ON_HIRE, LocationTypeInvert, [25, 25, 19, 25]],
  [ItemStatus.PICK_UP, LocationTypeInvert, [25, 25, 19, 25]],
  [ItemStatus.TRANSFER, LocationTypeInvert, [25, 25, 19, 25]],
  [ItemStatus.UNAVAILABLE, LocationTypeInvert, [26, 15, 25, 25]],
  [ItemStatus.FAULTY, LocationTypeInvert, [26, 15, 16, 16]],
  [ItemStatus.MISSING, LocationTypeInvert, [26, 25, 25, 25]]
];
export default matrixProductData;
