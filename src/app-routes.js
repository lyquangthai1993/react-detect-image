/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import AuthContext from "./auth/authContext";
import ModalWarning from "./components/ModalWarning/ModalWarning";
import Home from "./screens/Home/home";
import Training from "./screens/Training/training";
import Detect from "./screens/Detect/detect";

export const routeLinks = {
  root: "/",
  success: "/success",
  home: "/home",
  training: "/training",
  detect: "/detect"
};

export const NoMatch = ({ location }) => (
  <div className="text-center">
    <h3>
      Not found page in url <code>{location.pathname}</code>
    </h3>
  </div>
);

const AppRoutes = props => {

  return (
    <div className={"routes-wrapper"}>
      <Switch>
        <Route exact path={routeLinks.training} component={Training} />
        {/* <Route exact path={routeLinks.detect} component={Detect} /> */}
        <Route exact path={routeLinks.root} component={Home} />
        <Route exact path={routeLinks.home} component={Home} />
        
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
