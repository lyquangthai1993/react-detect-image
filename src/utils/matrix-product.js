const parseMatrixProduct = data => {
  let matrixTemp = data.map(row => {
    const [status, location, array] = row;

    let objectParse = {};
    Object.keys(location).map((key, indexKey) => {
      objectParse[key] = array[indexKey];
      return array[indexKey];
    });

    return [status, objectParse];
  });
  // console.log("matrixTemp----------", matrixTemp);
  return new Map(matrixTemp);
};
export default class MatrixProduct {
  constructor(data = []) {
    this.dataParse = parseMatrixProduct(data);
  }
  
  getRow = key => {
    console.log(this.dataParse);
    return this.dataParse.get(key);
  };

  getData = (x, y) => {
    console.log('getData: ', this.dataParse);
    let temp = this.dataParse.get(x) || {};
    return temp[y] || 24; // 24 is default for missing item
  };
}
