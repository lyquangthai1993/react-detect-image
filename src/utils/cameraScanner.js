import { isFunction } from "lodash";

const options = {
  preferFrontCamera: false, // iOS and Android
  showFlipCameraButton: true, // iOS and Android
  showTorchButton: true, // iOS and Android
  torchOn: true, // Android, launch with the torch switched on (if available)
  saveHistory: true, // Android, save scan history (default false)
  prompt: "Place a barcode inside the scan area", // Android
  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
  formats: "CODE_39", // default: all but PDF_417 and RSS_EXPANDED
  // orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
  disableAnimations: true, // iOS
  disableSuccessBeep: false // iOS and Android
};

// SCANNER CAMERA SECTION
export default class CameraScanner {
  constructor() {
    this.pluginScanner = window.cordova
      ? window.cordova.plugins.barcodeScanner
      : null;
    this.barcode = "";
  }
  
  setBarcode = code => {
    this.barcode = code;
  };

  getBarcode = () => this.barcode;

  getPluginScanner = () => {
    if (!this.pluginScanner) {
      alert("Scanning failed");
    }
  };
  
  scan = callback => {
    console.log(
      "window.cordova.plugins.barcodeScanner: ",
      window.cordova.plugins.barcodeScanner
    );
    console.log("this.pluginScanner: ", this.pluginScanner);
    this.pluginScanner.scan(
      result => {
        console.log(
          "We got a barcode\n" +
          "Result: " +
          result.text +
          "\n" +
          "Format: " +
          result.format +
          "\n" +
          "Cancelled: " +
          result.cancelled
        );
        this.setBarcode(result.text);
        if (isFunction(callback)) callback(result.text);
      },
      error => {
        console.log("Scanning failed: " + error);
        this.setBarcode("");
        if (isFunction(callback)) callback("");
      },
      options
    );
  };
}
