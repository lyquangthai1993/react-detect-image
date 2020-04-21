import React, { useState } from "react";
import Proptypes from "prop-types";
import ClassNames from "classnames";
import "./style.scss";
import "../BurgerMenu/burger-menu.scss";
import logoWhite from "../../images/Permobil_White.png";
import BurgerMenu from "../BurgerMenu";
import { handleRouteToSearchPage } from "../../utils/functionHelper";

const hideMobile = "d-none d-sm-block";
const HeaderDetailPage = props => {
  const {
    className = "",
    isHideMobile = true,
    hideBurger = false,
    actionReturn = () => {
    },
    titlePage = "",
    iconReturn,
    textReturn = ""
  } = props;

  const [searchTextState, setSearchTextState] = useState("");
  return (
    <div
      className={ClassNames(
        "header-detail-page-wrapper gradient-blue",
        className
      )}
    >
      {!hideBurger && (
        <BurgerMenu
          burgerButtonClassName={ClassNames(isHideMobile && hideMobile)}
          searchText={searchTextState}
          onSearch={text => {
            setSearchTextState(text);
            handleRouteToSearchPage(text);
          }}
        />
      )}
      <div
        className={"upper d-sm-flex justify-content-between align-items-center"}
      >
        <div
          className={
            "btn p-0 button button-smalls-white cursor-pointer d-inline-block"
          }
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            actionReturn();
          }}
        >
          <span className={"icon-return"}>{iconReturn}</span>
          {textReturn}
        </div>
        <div className={"h3-white-bold title-page flex-fill"}>{titlePage}</div>
        <div className={ClassNames("logo-block", hideMobile)}>
          <div className={"d-inline-block"}>
            <img className={"logo"} alt={"logo-white"} src={logoWhite}/>
          </div>
        </div>
      </div>
    </div>
  );
};
HeaderDetailPage.propTypes = {
  className: Proptypes.string,
  textReturn: Proptypes.string,
  isHideMobile: Proptypes.bool,
  hideBurger: Proptypes.bool,
  iconReturn: Proptypes.element.isRequired,
  actionReturn: Proptypes.func.isRequired,
  titlePage: Proptypes.string
};
export default HeaderDetailPage;
