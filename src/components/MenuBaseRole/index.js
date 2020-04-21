import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { memo, useContext, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { routeLinks } from "../../app-routes";
import useDebounce from "../../hooks/useDebounce";
import useWindowSize from "../../hooks/useWindowResize";
import { SearchDataContext } from "../../store/SearchData/context";
import { DEBOUNCE_TIME_SEARCH } from "../../utils/constants";
import { getListHireDataAPI, handleRouteToSearchPage } from "../../utils/functionHelper";
import history from "../../utils/history";
import ListGroupAppend from "../ListGroupAppend";
import SearchBox from "../SearchBox";
import SearchResultPanel from "../SearchResultPanel";
import "./styles.scss";

const TIME_ANIMATED = 800;
export const menuSwitch = {
  "clinician:all": [
    {
      name: "Request a hire",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push(routeLinks.createHire);
      }
    },
    {
      name: "FAQs",
      icon: (
        <FontAwesomeIcon icon={["far", "question-circle"]} className={"icon"}/>
      ),
      theme: "button-link-white",
      action: () => {
        history.push(routeLinks.faq);
      }
    }
  ],
  "hero:all": [
    {
      name: "Scan product",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push(routeLinks.productScan);
      }
    },
    {
      name: "View active requests",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
      }
    },
    {
      name: "Create a hire",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push(routeLinks.createHire);
      }
    },
    {
      name: "Enter serial number",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push({
          pathname: routeLinks.productScan,
          state: { focus: true }
        });
      }
    },
    {
      name: "Delivery/Collection issue",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
      }
    }
  ],
  "permobil_external:all": [
    {
      name: "Request a hire",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "white button-link-white",
      action: () => {
        history.push(routeLinks.createHire);
      }
    },
    {
      name: "Return your hire",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push({
          pathname: routeLinks.hireIdentify,
          state: {
            returnLink: routeLinks.hireDetail
          }
        });
      }
    },
    {
      name: "Add a product to your hire",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push({
          pathname: routeLinks.hireIdentify,
          state: {
            returnLink: routeLinks.hireDetail
          }
        });
      }
    },
    {
      name: "Report a faulty product",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
        history.push({
          pathname: routeLinks.hireIdentify,
          state: {
            returnLink: routeLinks.faultReport
          }
        });
      }
    },
    {
      name: "Request customer support",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
      }
    },
    {
      name: "Tell us how we did",
      icon: (
        <FontAwesomeIcon
          icon={["far", "arrow-alt-circle-right"]}
          className={"icon"}
        />
      ),
      theme: "button-link-white",
      action: () => {
      }
    },
    {
      name: "FAQs",
      icon: <FontAwesomeIcon icon={["far", "question-circle"]}/>,
      theme: "button-link-white",
      action: () => {
        history.push(routeLinks.faq);
      }
    }
  ]
};

function AnimatedVisibility({
                              visible,
                              children,
                              className,
                              animationIn,
                              animationOut
                            }) {
  const [display, setDisplay] = useState(visible);
  const [style, setStyle] = useState({ display: "none" });

  useEffect(() => {
    if (visible) setTimeout(() => setStyle({}), TIME_ANIMATED);

    setTimeout(() => setDisplay(visible), visible ? TIME_ANIMATED : 100);
  }, [visible]);

  return (
    <Animated
      animationIn={animationIn}
      animationOut={animationOut}
      animationInDuration={TIME_ANIMATED}
      animationOutDuration={TIME_ANIMATED}
      isVisible={display}
      style={style}
      className={className}
    >
      {children}
    </Animated>
  );
}

const MenuBaseRole = props => {
  const { className = "", role = "", permissionCheck } = props;

  const windowSize = useWindowSize();
  const [searchDataState, searchDataDispatch] = useContext(SearchDataContext);
  const { results = [], isSearching = true } = searchDataState;
  const [textSearch, setTextSearch] = useState("");
  const [isVisibleSearchPanel, setIsVisibleSearchPanel] = useState(false);
  const debouncedSearchTerm = useDebounce(textSearch, DEBOUNCE_TIME_SEARCH);

  useEffect(() => {
    setIsVisibleSearchPanel(!_.isEmpty(textSearch));
  }, [textSearch]);

  useEffect(() => {
    if (!_.isEmpty(textSearch))
      getListHireDataAPI(
        { ...searchDataState.params, search: textSearch },
        searchDataDispatch
      );
  }, [debouncedSearchTerm]);

  return (
    <div
      className={ClassNames(
        "menu-base-role-wrapper",
        windowSize.width <= 575 ? "is-mobile" : "not-mobile",
        className,
        role.replace(":", "-"),
        permissionCheck.isPermobil() ? "is-permobil" : "not-permobil"
      )}
    >
      <AnimatedVisibility
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        visible={isVisibleSearchPanel}
        className={ClassNames("search-result-wrapper")}
      >
        <SearchResultPanel
          results={results}
          isSearching={isSearching}
          clearSearch={() => {
            setTextSearch("");
          }}
        />
      </AnimatedVisibility>
    
      <div className={"menu-parent"}>
        <div className={"upper gradient-blue"}>
          <div className={ClassNames("welcome-section h1-white")}>
            Welcome
            {permissionCheck.isPermobil() ? ", how can we help you?" : ""}
          </div>
          <SearchBox
            hidden={permissionCheck.isPermobil()}
            value={textSearch}
            theme={"transparent"}
            placeHolder={"Search for client hire"}
            onSearch={text => {
              setTextSearch(text);
              if (windowSize.width <= 575) {
                handleRouteToSearchPage(text);
              }
            }}
            onClick={textSearch => {
              if (!_.isEmpty(textSearch))
                getListHireDataAPI(
                  { ...searchDataState.params, search: textSearch },
                  searchDataDispatch
                );
            }}
          />
        </div>
        <div className={"under bg-dusk-blue"}>
          <ListGroupAppend theme={"transparent"} listItem={menuSwitch[role]}/>
        </div>
      </div>
    </div>
  );
};

MenuBaseRole.defaultProps = {};

MenuBaseRole.propTypes = {
  className: PropTypes.string,
  role: PropTypes.string
};

export default memo(MenuBaseRole);
