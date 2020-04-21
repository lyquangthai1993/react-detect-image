import localForageApp from "localforage";
import jwt_decode from "jwt-decode";
import { getRedirectUrl, openUrl } from "../utils/functionHelper";
import { routeLinks } from "../app-routes";
import history from "../utils/history";

export default class Auth {
  auth0 = {};

  //for app
  client = {};

  userProfile = {};
  permissions = [];

  login = () => {
    console.log("this.client", this.client);
    this.auth0.authorize();
  };

  loginAppNative = (props, authContext) => {};
  saveLocal = authResult => {
    // !Example
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localForageApp.setItem("expiresAt", expiresAt);
    localForageApp.setItem("access_token", authResult.accessToken);
    localForageApp.setItem("id_token", authResult.idToken);
  };
  logout = () => {
    // ! just clear all local storage
    localForageApp.clear();
    history.replace(routeLinks.login);
    // ! HANDLE LOGOUT HERE
  };

  register = () => {
    if (window.cordova) this.loginAppNative();
    else
      this.auth0.authorize({
        login_hint: "signUp"
      });
  };

  handleAuth = props => {
    // !HANDLE
  };

  getAccessToken = () => {
    return localForageApp.getItem("access_token");
  };

  getIdToken = () => {
    return localForageApp.getItem("id_token");
  };

  getProfile = () => {
    const parseProfile = async () => {
      let token = await this.getIdToken();
      this.userProfile = jwt_decode(token);
      console.log("**********USERPROFILE********\n", this.userProfile);
      return this.userProfile;
    };

    return parseProfile();
  };

  getPermissions = () => {
    const parsePermission = async () => {
      let token = await this.getAccessToken();
      console.log("**********TOKEN********\n", token);
      const { permissions = [] } = jwt_decode(token) || {};

      this.permissions = permissions;
      console.log("**********PERMISSIONS********\n", this.permissions);
      return permissions;
    };

    return parsePermission();
  };

  isAuthenticated = () => {
    return localForageApp
      .getItem("expiresAt")
      .then(expiresAt => {
        return new Date().getTime() < expiresAt;
      })
      .catch(err => {
        console.log("isAuthenticated err:", err);
        return false;
      });
  };
}

/*import auth0 from 'auth0-js';

// Note, this is a standard JavaScript class (not React), taken from Auth0 samples.
export default class Auth {

  constructor() {

    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.auth0.authorize();
  }

  getProfile() {
    return this.profile;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    });
  }
}

*/
