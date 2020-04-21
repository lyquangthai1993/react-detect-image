import React from "react";
import "./TagBlueDetail.scss";
import PropTypes from "prop-types";
import ClassNames from "classnames";

const TagBlueDetail = props => {
  const { label = "", value = "", theme = "" } = props;
  return (
      <div className={ClassNames("tag-blue-detail-wrapper d-sm-flex justify-content-between", theme)}>
        <div className={"field input-label-blue"}>{label}:</div>
        <div className={"value p-base"}>{value}</div>
      </div>
  );
};

TagBlueDetail.defaultProps = {};

TagBlueDetail.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.any,
};

export default TagBlueDetail;
