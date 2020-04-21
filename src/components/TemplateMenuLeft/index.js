import React from "react";
import PropTypes from "prop-types";
import "./TemplateMenuLeft.scss";
import useWindowSize from "../../hooks/useWindowResize";
import ClassNames from "classnames";

const TemplateMenuLeft = props => {
  const { leftSideComponent, rightSideComponent } = props;
  const windowSize = useWindowSize();
  return (
      <div className={ClassNames("template-menu-left-wrapper", { "is-mobile": windowSize.width <= 575 })}>
        <div className={"left-side-component"}>
          {leftSideComponent}
        </div>
        <div className={"right-side-component padding-lr-responsive padding-tb-responsive"}>
          {rightSideComponent}
        </div>
      </div>
  );
};

TemplateMenuLeft.defaultProps = {};

TemplateMenuLeft.propTypes = {
  leftSideComponent: PropTypes.node,
  rightSideComponent: PropTypes.node,
};

export default TemplateMenuLeft;
