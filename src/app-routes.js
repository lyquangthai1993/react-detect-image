/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import AuthContext from "./auth/authContext";
import ModalWarning from "./components/ModalWarning/ModalWarning";
import Home from "./screens/Home/home";
import Login from "./screens/Login/login";

export const routeLinks = {
  root: "/",
  success: "/success",
  home: "/home",
  login: "/login",
  about: "/about",
};

export const PrivateRoute = ({ component: Component, auth }) => (
  <Route
    render={props => {
      return auth ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: routeLinks.login }} />
      );
    }}
  />
);

export const AuthenticatedRoute = ({ component: Component, auth }) => (
  <Route
    render={props => {
      return !auth ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: routeLinks.home }} />
      );
    }}
  />
);
export const NoMatch = ({ location }) => (
  <div>
    <h3>
      Not found page in url <code>{location.pathname}</code>
    </h3>
  </div>
);
const AppRoutes = props => {
  const authContext = useContext(AuthContext);
  const [warningPopup, setWarningPopup] = useState(false);

  return (
    <div className={"routes-wrapper"}>
      <Switch>
        <Route
          exact
          path={routeLinks.root}
          auth={authContext.isAuthenticated}
          component={Home}
        />
        <Route
          exact
          path={routeLinks.home}
          auth={authContext.isAuthenticated}
          component={Home}
        />

        <Route
          path={routeLinks.login}
          auth={authContext.isAuthenticated}
          component={Login}
        />

        <Route component={NoMatch} />
      </Switch>

      <ModalWarning
        title={"Your token is expired"}
        body={"You will logout."}
        acceptText={"OK"}
        show={warningPopup}
        accept={() => {
        }}
        close={setWarningPopup}
      />
    </div>
  );
};

export default AppRoutes;
