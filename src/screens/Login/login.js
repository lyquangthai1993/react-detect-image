/* eslint-disable no-undef */
import React, { useContext } from "react";
// Images assets
import avatar from "../../images/user.svg";
import FooterCall from "../../components/footer/footerCall";
import AuthContext from "../../auth/authContext";
import "./login.scss";
import { openUrlInApp } from "../../utils/functionHelper";

const Login = props => {
  const authContext = useContext(AuthContext);

  return (
    <div className={"login-wrapper"}>
      <div className={"upper-wrapper"}>
        <img className={"logo"} alt={"logo"} src={avatar} />
        <div className={"hiring"}>Permobil Online Platform</div>

        <button
          className={"btn-block btn-login button-link-white"}
          onClick={() =>
            window.cordova
              ? authContext.authObj.loginAppNative(props)
              : authContext.authObj.login()
          }
        >
          Login
        </button>

        {/*! authObj will handle new instance*/}
        <div className={"text-link-white mb-8"}>
          Need an account?{" "}
          <button
            className={"btn btn-blue button-link-white underline p-0"}
            onClick={() => authContext.authObj.register(props)}
          >
            Register now
          </button>
        </div>

        <div className={"text-link-white"}>
          By continuing, you accept our{" "}
          <button
            className={"underline cursor-pointer button-link-white btn p-0"}
            onClick={() => openUrlInApp("http://privacy.permobil.com")}
          >
            privacy policy
          </button>
        </div>
      </div>
      <FooterCall className={"bottom paragraph-small"} />
    </div>
  );
};

export default Login;
