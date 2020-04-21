/* eslint-disable no-undef */
import React, { useContext } from "react";
import avatar from "../../images/user.svg";
import { slide as Menu } from "react-burger-menu";
import "./burger-menu.scss";
import AuthContext from "../../auth/authContext";
import SearchBox from "../SearchBox";
import ListGroupAppend from "../ListGroupAppend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as PropTypes from "prop-types";
import history from "../../utils/history";
import { routeLinks } from "../../app-routes";

const stylesMenu = {
  bmOverlay: {
    background: "rgba(65, 64, 66, 0.65)",
  },
  bmBurgerButton: { zIndex: 1001 },
  bmCrossButton: {
    height: "20px",
    width: "20px",
  },
  bmCross: {
    height: "24px",
    width: "3px"
  },
};
const BurgerMenu = props => {
  const {
    outerContainerId = "",
    pageWrapId = "",
    burgerButtonClassName = "",
    searchText = "",
    onSearch = () => {
    }
  } = props;
  const authContext = useContext(AuthContext);

  const { authState = {} } = authContext;
  const { profile = {} } = authState;
  const { nickname = "", picture = "" } = profile || {};

  return (
    <Menu
      {...props}
      disableOverlayClick
      right
      width={320}
      styles={stylesMenu}
      pageWrapId={pageWrapId}
      outerContainerId={outerContainerId}
      bodyClassName={"menu-right-side"}
      burgerButtonClassName={burgerButtonClassName}
      menuClassName={"burger-menu-wrapper"}
    >
      <div className={"upper"}>
        <div className={"logo-wrapper text-right"}>
          <img alt={"logo-blue"} src={avatar} className={"logo"}/>
        </div>
        <div className={"user-info paragraph-heading-charcoal"}>
          <img
            alt={"avatar"}
            className={"avatar rounded-circle"}
            src={picture}
            onError={e => {
              e.target.onerror = null;
              e.target.src = avatar;
            }}
          />
          <span>{nickname}</span>
        </div>
      </div>

      <div className={"lower bg-dusk-blue"}>
        <SearchBox
          theme={"white"}
          value={searchText}
          onSearch={text => {
            onSearch(text);
          }}
        />
      </div>
      <ListGroupAppend
        theme={"white"}
        appendIcon={
          <FontAwesomeIcon
            icon={"chevron-right"}
            className={"icon color-dusk-blue"}
          />
        }
        listItem={[
          {
            name: "About us",
            theme: "p-base",
            action: () => {
              history.push(routeLinks.about);
            },
          },
          {
            name: "Logout",
            theme: "p-base",
            action: () => {
              authContext.handleUserLogout();
            },
          },
        ]}
      />
      <div className={"app-version paragraph-small"}>{appVersion}</div>
    </Menu>
  );
};

BurgerMenu.propTypes = {
  pageWrapId: PropTypes.string,
  outerContainerId: PropTypes.string,
  searchText: PropTypes.string,
  burgerButtonClassName: PropTypes.string,
  onSearch: PropTypes.func,
};
export default BurgerMenu;
