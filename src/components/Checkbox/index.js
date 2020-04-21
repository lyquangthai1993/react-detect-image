/**
 *
 * Checkbox
 *
 */
import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ClassNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

export const Checkbox = (props) => {
  const {
    label = "",
    name = "",
    className = "",
    checked = false,
    showError = false,
    error = "",
    touched = false,
    onChange = () => {
    }
  } = props;
  
  return (
    <div className={ClassNames(
      "base-checkbox-circle",
      className,
      { "error": touched && !_.isEmpty(error) }
    )
    }
         onClick={(e) => {
           e.preventDefault();
           onChange(!checked);
         }}>
      <label className={"d-flex cursor-pointer"}>
        <FontAwesomeIcon icon={["far", checked ? "check-square" : "square"]}
                         className={ClassNames("align-self-start", "icon", checked ? "checked color-cerulean" : "color-charcoal-grey")}
        />
        
        <input
          className={"base-input align-self-start"}
          name={name}
          type={"checkbox"}
          onChange={onChange}
          checked={checked}
        />
        
        {label && <span className={"base-label p-base align-self-start"}>{label}</span>}
      </label>
      {showError && touched && !_.isEmpty(error) && <div className="input-field-error">{error}</div>}
    </div>
  );
};
Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  showError: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
  // error: PropTypes.string,
  // touched: PropTypes.bool
};
