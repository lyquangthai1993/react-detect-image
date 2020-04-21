/**
 *
 * TextBox
 *
 */

import ClassNames from "classnames";
import { isNumber } from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useRef } from "react";
import NumberFormat from "react-number-format";
import "./style.scss";
// import styled from 'styled-components';

const TextBox = props => {
  const {
    showError = true,
    className = "",
    label = "",
    name = "",
    touched = false,
    error = "",
    type = "text",
    placeholder = "",
    value = "",
    appendLabel = "",
    classNameAppend = "",
    prependLabel = "",
    classNamePrepend = "",
    classNameInput = "",
    maxLength,
    minLength,
    isTextarea = false,
    format = false,
    readOnly = false,
    inputRef,
    onClick = () => {
    },
    onBlur = () => {
    },
    onChange = () => {
    }
  } = props;
  const wrapperRef = useRef(null);
  const handleChange = useCallback(
    e => {
      let { value = "" } = e.target;
      if (isNumber(maxLength)) {
        // console.log(value.slice(0, maxLength));
        e.target.value = value.slice(0, maxLength);
      }
      // console.log("handleChange", e);
      onChange(e);
    },
    [onChange, maxLength]
  );

  const handleFocus = useCallback(e => {
    console.log("handleFocus");
  
    try {
      setTimeout(e.target.select(), 1000);
    } catch (e) {
      alert(e);
    }
  }, []);
  
  return (
    <div
      className={ClassNames(
        "text-box-wrapper",
        className,
        touched && error && "error"
      )}
      ref={wrapperRef}
      onClick={onClick}
    >
      {label && (
        <label className={"label"} htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={ClassNames(
          (prependLabel || appendLabel) && "input-group",
          touched && error && "error"
        )}
      >
        {prependLabel && (
          <div className={ClassNames("input-group-prepend", classNamePrepend)}>
            <span
              className={ClassNames(
                "input-group-text",
                touched && error && "error-form"
              )}
            >
              {prependLabel}
            </span>
          </div>
        )}
  
        {format ? (
          <NumberFormat
            className={ClassNames(
              "form-control",
              classNameInput,
              touched && error && "error"
            )}
            value={value}
            name={name}
            type={type}
            ref={inputRef}
            thousandSeparator={false}
            // maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            readOnly={readOnly}
            onValueChange={value => {
              console.log(value);
            }}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            // onClick={handleFocus}
          />
        ) : isTextarea ? (
          <textarea
            {...props}
            className={ClassNames(
              "form-control",
              classNameInput,
              touched && error && "error"
            )}
            name={name}
            value={value}
            // maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            readOnly={readOnly}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            // onClick={handleFocus}
          />
        ) : (
          <input
            className={ClassNames(
              "form-control",
              classNameInput,
              touched && error && "error"
            )}
            name={name}
            ref={inputRef}
            type={type}
            value={value}
            // maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            readOnly={readOnly}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            // onClick={handleFocus}
          />
        )}
        {appendLabel && (
          <div
            className={ClassNames(
              "input-group-append",
              classNameAppend,
              touched && error && "error"
            )}
          >
            <span className={ClassNames("input-group-text")}>
              {appendLabel}
            </span>
          </div>
        )}
      </div>
      {showError && touched && error && (
        <div className="input-field-error">{error}</div>
      )}
    </div>
  );
};
TextBox.defaultProps = {};
TextBox.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  appendLabel: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
  isTextarea: PropTypes.bool,
  format: PropTypes.bool, // format number
  readOnly: PropTypes.bool,
  showError: PropTypes.bool,
  inputRef: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.any,
  touched: PropTypes.oneOf([true, false, undefined]),
  error: PropTypes.string,
  classNameAppend: PropTypes.string,
  prependLabel: PropTypes.any,
  classNamePrepend: PropTypes.string,
  classNameInput: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export default TextBox;
