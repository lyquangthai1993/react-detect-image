import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { calculateViewHeight, intentHandler, rotateDevice, settingKeyboard, settingSomeSpecialDevice } from "./utils/functionHelper";
import history from "./utils/history";
import { Router } from "react-router";

const startApp = () => {
  window.handleOpenURL = intentHandler;
  rotateDevice();
  settingSomeSpecialDevice();
  calculateViewHeight();
  settingKeyboard();

  ReactDOM.render(
    <Router history={history}>
      <App/>
    </Router>,
    document.getElementById("root")
  );
};

if (window.cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  ReactDOM.render(
    <Router history={history}>
      <App/>
    </Router>,
    document.getElementById("root")
  );
}

// if (process.env.NODE_ENV !== "development") {
//   console.log = () => {
//   };
// }
console.log("PROCESS ENV: ", process.env);