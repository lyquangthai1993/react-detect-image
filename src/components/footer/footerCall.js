import ClassNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";

const FooterCall = (props) => {
  const { className = "" } = props;
  return (
    <div className={ClassNames("footer footer-call-wrapper", className)}>
      Footer
    </div>
  );
};

FooterCall.propTypes = {
  className: PropTypes.string,
};

export default FooterCall;
