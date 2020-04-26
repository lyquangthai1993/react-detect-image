// Font awesome setting
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle, far } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faArrowAltCircleRight,
  faArrowRight,
  faCalendarAlt,
  faCheckCircle,
  faCheckSquare,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faDotCircle,
  faFrown,
  faMeh,
  faMinus,
  faPhoneAlt,
  fas,
  faSearch,
  faShoppingCart,
  faSmile,
  faSquare,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import localForageApp from "localforage";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./app-routes";
import "./App.scss";
import * as USER_ACTIONS from "./auth/authActions";
import AuthContext from "./auth/authContext";
import { AuthReducer, initialUserState } from "./auth/authReducer";
import LoadingIndicator from "./components/LoadingIndicator";
import ModalWarning from "./components/ModalWarning/ModalWarning";
import "./components/ModalWarning/ModalWarning.scss";
import * as CORE_DATA_ACTIONS from "./store/CoreData/coreDataActions";
import { CoreDataContext } from "./store/CoreData/coreDataContext";
import { CoreDataReducer, initialCoreDataState } from "./store/CoreData/coreDataReducer";
import { LookupDataContext } from "./store/LookupData/lookupDataContext";
import { initialLookupDataState, LookupDataReducer } from "./store/LookupData/lookupDataReducer";
import { SearchDataContext } from "./store/SearchData/context";
import { initialSearchDataState, SearchDataReducer } from "./store/SearchData/reducer";
import axiosInstance from "./utils/axios/axiosConfig";
import { AxiosGetRetry } from "./utils/axios/axiosGet";


localForageApp.config({
  driver: localForageApp.LOCALSTORAGE,
  name: "appReactCordova",
  version: 1.0,
});

library.add(
  fab,
  fas,
  far,
  faPhoneAlt,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faAngleRight,
  faArrowAltCircleRight,
  faQuestionCircle,
  faTimes,
  faCheckSquare,
  faSquare,
  faCheckCircle,
  faArrowRight,
  faMinus,
  faCalendarAlt,
  faCircle,
  faDotCircle,
  faShoppingCart,
  faSmile,
  faMeh,
  faFrown
);


const App = () => {
  const [showError, setShowError] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [axiosConfig, setAxiosConfig] = useState({});
  const lookupDataState = useReducer(LookupDataReducer, initialLookupDataState);
  const [coreDataState, coreDataDispatch] = useReducer(
    CoreDataReducer,
    initialCoreDataState
  );
  const searchDataState = useReducer(SearchDataReducer, initialSearchDataState);
  
  const [authState, authDispatch] = useReducer(AuthReducer, initialUserState);

  const listenAxios = useCallback(() => {
    // Add a response interceptor
    axiosInstance.interceptors.request.use(
      config => {
        // Do something before request is sent
        coreDataDispatch(CORE_DATA_ACTIONS.plusCount());
        return config;
      },
      error => {
        // Do something with request error
        coreDataDispatch(CORE_DATA_ACTIONS.plusCount());

        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      response => {
        // Do something with response data
        // this.props.reposLoaded();
        coreDataDispatch(CORE_DATA_ACTIONS.minusCount());
        return response;
      },
      error => {
        coreDataDispatch(CORE_DATA_ACTIONS.minusCount());
        setGlobalError("");

        const { showPopup = true } = error.config.customParameter;
        showPopup && setShowError(true);

        // Do something with response
        console.log("listenAxios error--------------", error);
        console.log("listenAxios error config--------------", error.config);
        setAxiosConfig(error.config);
        if (error && error.response) {
          console.log(
            "listenAxios error response--------------",
            error.response
          );
          const { status = 0 } = error.response;
          setErrorCode(status);
          console.log("Error code--------------", status);
          // if (data) {
          //   const { title = "" } = data;
          //   // setGlobalError(
          //   //   `Error code from API: ${status}
          //   //   ${title ? "Content: " + title : ""}
          //   //   `
          //   // );
          //   setGlobalError(`Something went wrong. Please try again later.`);
          // } else
          setGlobalError(`Something went wrong. Please try again later.`);
        } else {
          // setGlobalError(error.message);
          setGlobalError(`Something went wrong. Please try again later.`);
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const handleLogin = () => {
    authDispatch(USER_ACTIONS.login_success());
  };

  const handleLogout = () => {
    authDispatch(USER_ACTIONS.remove_profile());
  };

  const handleAddProfile = profile => {
    authDispatch(USER_ACTIONS.add_profile(profile));
  };

  const handleRemoveProfile = () => {
    authDispatch(USER_ACTIONS.remove_profile());
  };

  //Handle authentication from callback
  const handleAuthentication = props => {
    if (props.location.hash) {
    }
  };

  useEffect(() => {
    listenAxios();
  }, [listenAxios]);

  return (
    <div id={"app"}>
      {coreDataState.countLoading > 0 && <LoadingIndicator />}

      <ToastContainer
        closeButton={false}
        hideProgressBar={true}
        className={"my-toast-container"}
      />
      
      <AuthContext.Provider
        value={{
          //Auth Reducer
          authState: authState,
          authDispatch: authDispatch,
          isAuthenticated: authState.is_authenticated,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: profile => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          //Handle auth
          handleAuth: props => handleAuthentication(props),
          authObj: {},
        }}
      >
        <LookupDataContext.Provider value={lookupDataState}>
          <CoreDataContext.Provider value={coreDataState}>
            <SearchDataContext.Provider value={searchDataState}>
                <AppRoutes />
              </SearchDataContext.Provider>
          </CoreDataContext.Provider>
        </LookupDataContext.Provider>
      </AuthContext.Provider>
      <ModalWarning
        title={errorCode === 401 ? "You will need to log in again" : "Ooops!"}
        body={
          errorCode === 401
            ? "For security reasons you will need to log back into the app. This is needed to refresh your session."
            : globalError
        }
        acceptText={errorCode === 401 ? "Logout" : "Retry"}
        cancelText={errorCode === 401 ? "" : "Close"}
        show={showError}
        className={"modal-warning"}
        inverseButton={true}
        accept={() => {
          if (errorCode === 401) {
          } else {
            AxiosGetRetry(axiosConfig);
          }
        }}
        close={setShowError}
      />
    </div>
  );
};

export default App;
