import { createBrowserHistory, createHashHistory } from "history";

console.log("window.cordova: ", window.cordova);
export default window.cordova ? createHashHistory() : createBrowserHistory();
