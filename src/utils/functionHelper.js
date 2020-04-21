// import Auth0Cordova from "@auth0/cordova";
import _ from "lodash";
import { routeLinks } from "../app-routes";
import env from "../env";
import * as SEARCH_DATA_ACTIONS from "../store/SearchData/actions";
import { AxiosGet } from "./axios/axiosGet";
import { checkPlatform } from "./helpers";
import history from "./history";

export const debounce = (func, wait) => {
  return function() {
    let context = this,
      args = arguments;

    let executeFunction = function() {
      func.apply(context, args);
    };

    setTimeout(executeFunction, wait);
  };
};

export const rotateDevice = () => {
  console.log("----------window.mobilecheck: ", window.mobilecheck());
  var isMobile = window.mobilecheck(); //initiate as false

  console.log("----------isMobile: ", isMobile);
  console.log("----------window.screen: ", window.screen);
  if (window.cordova)
    if (isMobile) {
      window.screen.orientation.lock("portrait");
    } else {
      window.screen.orientation.lock("landscape");
    }
};

export const settingSomeSpecialDevice = () => {
  setTimeout(() => {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.backgroundColorByHexString("#205a89");
  }, 500);
  console.log("window.Keyboard.....:", window.Keyboard);
  // Set this in ios platform can scroll when keyboard open
  if (checkPlatform("ios")) {
    console.log("setting special for ios.....");
    // Set this in ios platform can scroll when keyboard open
    // window.Keyboard.disableScrollingInShrinkView(true);
  }

  if (checkPlatform("android")) {
    console.log("setting special for android.....");
  }
};
window.mobilecheck = function() {
  var check = false;
  (function(a) {
    /* eslint-disable-next-line */
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /* eslint-disable-next-line */
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
export const intentHandler = (url) => {
  // Auth0Cordova.onRedirectUri(url);
};

export const settingKeyboard = () => {
  // document.addEventListener(
  //   "touchend",
  //   function(e) {
  //     console.log("------------touchend", e);
  //     if (
  //       e.target.type !== "search" &&
  //       e.target.type !== "text" &&
  //       e.target.type !== "email" &&
  //       e.target.type !== "password"
  //     ) {
  //       if (window.Keyboard.isVisible) {
  //         window.Keyboard.hide();
  //       }
  //     }
  //   },
  //   false
  // );
};
export const getListHireDataAPI = async (params, searchDataDispatch) => {
  // Make sure we have a value (user has entered something in input)
  searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("params", params));
  searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("results", []));
  searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("isSearching", true));

  try {
    // ! FIRST LOGIC TO DEV IS WILL CHECK CORRECT TEXT MATCHING
    const query = Object.keys(params)
      .map(k => k + "=" + encodeURIComponent(params[k]))
      .join("&");
    const data = await AxiosGet(`Hire${query ? `?${query}` : ""}`);

    searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("isSearching", false));
    if (data["data"] && !_.isEmpty(data["data"]["results"])) {
      searchDataDispatch(
        SEARCH_DATA_ACTIONS.changeField("results", data["data"]["results"])
      );
    } else {
      // !FAKE CODE TO SHOW SEARCH RESULT
      // if (search === "single") {
      //   searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("results", [dataSingleSearch[0]]));
      // }
      // if (search === "multiple") {
      //   searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("results", dataSingleSearch));
      // }
    }
  } catch (error) {
    console.log("getListHireDataAPI error: ", error);
  } finally {
    searchDataDispatch(SEARCH_DATA_ACTIONS.changeField("isSearching", false));
  }
};

export const handleRouteToSearchPage = _.debounce(text => {
  const option = {
    pathname: routeLinks.hireSearch,
    state: {
      params: {
        search: text
      }
    }
  };
  // current route is hireSearch will replace not push
  if (history.location.pathname === routeLinks.hireSearch)
    history.replace(option);
  else history.push(option);
}, 1000);

export const customerArray = [
  { name: "thai", customerId: "1" },
  { name: "duong", customerId: "2" }
];

export const searchCustomer = (inputValue, list) =>
  // TODO: improve code to API get
  new Promise(resolve => {
    setTimeout(async () => {
      // let result = await getData(model);

      const filtered = _.filter(list, i =>
        i.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      resolve(filtered);
    }, 500);
  });

export const calculateViewHeight = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  window.addEventListener("orientationchange", function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
};

export const getRedirectUrl = () => {
  let domain = env.AUTH0_DOMAIN;
  let clientId = env.AUTH0_CLIENT_ID;
  let pakageId = env.PACKAGE_ID;
  let returnTo =
    pakageId + "://" + domain + "/cordova/" + pakageId + "/callback";
  return (
    "https://" +
    domain +
    "/v2/logout?client_id=" +
    clientId +
    "&returnTo=" +
    returnTo
  );
};

export const openUrl = url => {
  if (window.cordova) {
    window.SafariViewController.isAvailable(function(available) {
      if (available) {
        window.SafariViewController.show(
          {
            url: url
          },
          function(result) {
            if (result.event === "loaded") {
              window.SafariViewController.hide();
            }
          },
          function(msg) {
            console.log("KO: " + JSON.stringify(msg));
          }
        );
      } else {
        window.open(url, "_system");
      }
    });
  } else {
    window.open(url, "_blank");
  }
};

export const openUrlInApp = url => {
  if (window.cordova) {
    window.SafariViewController.isAvailable(function(available) {
      if (available) {
        window.SafariViewController.show(
          {
            url: url
          },
          function(result) {
            if (result.event === "loaded") {
              console.log("Result: ", result);
            }
          },
          function(msg) {
            console.log("KO: " + JSON.stringify(msg));
          }
        );
      } else {
        window.open(url, "_system");
      }
    });
  } else {
    window.open(url, "_blank");
  }
};

export const toUpperJoinUnderline = text => {
  return text
    .split(" ")
    .join("_")
    .toUpperCase();
};