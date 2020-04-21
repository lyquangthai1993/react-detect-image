import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import "./styles.scss";
import HeaderDetailPage from "../HeaderDetailPage/header-detail-page";

const TemplateDetail = props => {
  const {
    children,
    className = "",
    hideBurger = false,
    isHideBurgerMobile = true,
    actionReturn
  } = props;

  return (
    <div className={ClassNames("template-detail-wrapper", className)}>
      <HeaderDetailPage
        {...props}
        hideBurger={hideBurger}
        isHideMobile={isHideBurgerMobile}
        actionReturn={actionReturn}
      />
      <div className={"children-bidding"}>{children}</div>
    </div>
  );
};

TemplateDetail.propTypes = {
  className: PropTypes.string,
  textReturn: PropTypes.string,
  iconReturn: PropTypes.element.isRequired,
  actionReturn: PropTypes.func.isRequired,
  titlePage: PropTypes.string,
  isHideBurgerMobile: PropTypes.bool,
  hideBurger: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default TemplateDetail;
