/**
 *
 * RadioList
 *
 */
import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ClassNames from "classnames";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleCompare = (value, valueOption, isMultiple) => {
  if (!isMultiple) return value.toString() !== valueOption.toString();
  else {
    return value.indexOf(valueOption) === -1;
  }
};
export const RadioList = props => {
  const {
    options = [],
    value = "",
    name = "",
    className = "",
    label = "",
    touched = false,
    error = "",
    isCheckbox,
    isMultiple,
    onSelect = () => {},
  } = props;
  return (
    <div
      className={ClassNames("radio-list-wrapper", className, {
        error: touched && !_.isEmpty(error),
      })}
    >
      {label && (
        <div className={"label paragraph-heading-charcoal"}>{label}</div>
      )}
      {options.map((op, index) => {
        const { label = "", value: valueOption } = op;
        let compare = handleCompare(value, valueOption, isMultiple);
        return (
          <div className={"option-wrapper"} key={index}>
            <label className={"cursor-pointer"}>
              {!isCheckbox ? (
                <FontAwesomeIcon
                  icon={["far", compare ? "circle" : "dot-circle"]}
                  className={ClassNames(
                    "radio-icon",
                    compare ? "color-charcoal-grey" : "color-cerulean",
                  )}
                />
              ) : (
                <FontAwesomeIcon
                  icon={["far", compare ? "square" : "check-square"]}
                  className={ClassNames(
                    "radio-icon",
                    compare ? "color-charcoal-grey" : "color-cerulean",
                  )}
                />
              )}

              <input
                className="base-input"
                name={name}
                checked={valueOption === value}
                value={valueOption}
                type={isMultiple ? "checkbox" : "radio"}
                onChange={e => {
                  if (!isMultiple) onSelect(e.target.value);
                  else {
                    console.log(e.target);
                    if (value.indexOf(valueOption) === -1)
                      onSelect([].concat(value, valueOption));
                    else {
                      onSelect(value.filter(v => v !== valueOption));
                    }
                  }
                }}
              />

              {label && <span className={"base-label p-base"}>{label}</span>}
            </label>
          </div>
        );
      })}
      {touched && error && <div className="input-field-error">{error}</div>}
    </div>
  );
};
RadioList.defaultProps = {
  className: "",
  options: [],
  isCheckbox: false,
  isMultiple: false,
  onSelect: () => {},
};
RadioList.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.array,
  isCheckbox: PropTypes.bool,
  isMultiple: PropTypes.bool,
};
