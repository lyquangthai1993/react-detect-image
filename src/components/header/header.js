import ClassNames from "classnames";
import Proptypes from "prop-types";
import React from "react";
import "../BurgerMenu/burger-menu.scss";
import "./style.scss";

const Header = (props) => {
  const { className = "" } = props;
  return (
      <div className={ClassNames("header-wrapper", className)}>
        <div className={"logo-block"}>
          <img className={"logo-left"} alt={"logo-white"} src={"./logo512.png"}/> <span className={"input-label-white"}>React cordova template</span>
        </div>
      </div>
  );
};
Header.propTypes = {
  className: Proptypes.string,
};
export default Header;
