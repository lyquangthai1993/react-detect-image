import React, { useContext, useEffect } from "react";
import history from "../utils/history";
import AuthContext from "./authContext";
import { routeLinks } from "../app-routes";
import LoadingIndicator from "../components/LoadingIndicator";

const AuthCheck = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      if (await authContext.authObj.isAuthenticated()) {
        authContext.handleUserLogin();
        authContext.handleUserAddProfile({
          ...authContext.authObj.userProfile,
          permissions: authContext.authObj.permissions
        });
        history.replace(routeLinks.home);
      } else {
        authContext.handleUserLogout();
        authContext.handleUserRemoveProfile();
        history.replace(routeLinks.root);
      }
    };
    setTimeout(() => {
      checkAuth();
    }, 1000);
  }, [authContext]);
  
  return (
    <div className={"auth-check-wrapper"}>
      <LoadingIndicator/>
    </div>
  );
};

export default AuthCheck;
