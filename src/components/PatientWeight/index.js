import React, { useCallback } from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import "./style.scss";
import TextBox from "../TextBox";
import ClassNames from "classnames";

function PatientWeight(props) {
  const {
    disabled = false,
    value = "",
    type = "",
    name = "",
    touched = false,
    error = "",
    unit = "",
    hidden,
    readOnly = false,
    onBlur = () => {},
    onChange = () => {},
  } = props;

  return (
    <div
      className={ClassNames("patient-weight", { disabled: disabled })}
      hidden={hidden}
    >
      <TextBox
        type={type || "number"}
        format={true}
        name={name}
        showError={false}
        value={value}
        touched={touched}
        error={error}
        appendLabel={unit}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error && <div className="input-field-error">{error}</div>}
    </div>
  );
}

PatientWeight.propTypes = {
  unit: PropTypes.string,
};

export default PatientWeight;
