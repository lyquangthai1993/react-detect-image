import React from "react";
import PropTypes from "prop-types";
import "./LabelDarkBlue.scss";
import ClassNames from "classnames";
const LabelDarkBlue = props => {
  const {
    theme = "",
    label = "",
    iconPrepend,
    iconAppend,
    hireId = "",
    toggle = () => {},
    action = () => {},
  } = props;

  return (
    <div
      className={ClassNames(
        "label-dark-blue-wrapper bg-dark-blue cursor-pointer",
        "d-flex",
        theme,
      )}
      onClick={() => {
        action(hireId);
        toggle(false);
      }}
    >
      <div className={"icon-prepend align-self-center"}>
        {iconPrepend && <img alt={"request"} src={iconPrepend} />}
      </div>
      <div className={"label align-self-center flex-grow-1"}>{label}</div>
      <div className={"icon-append float-right lh-1 align-self-center"}>
        {iconAppend}
      </div>
    </div>
  );
};
LabelDarkBlue.defaultProps = {
  iconPrepend: null,
};
LabelDarkBlue.propTypes = {
  theme: PropTypes.string,
  label: PropTypes.string,
  iconPrepend: PropTypes.any,
  iconAppend: PropTypes.any,
  hireId: PropTypes.any,
  toggle: PropTypes.func,
  action: PropTypes.func,
};

export default LabelDarkBlue;
