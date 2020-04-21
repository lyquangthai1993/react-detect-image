/**
 *
 * Selection
 *
 */
// !must use react-select version ..., dont' update package
import ClassName from "classnames";
import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./style.scss";

function SelectionNgoc(props) {
  return (
    <div
      className={ClassName(
        "selection-wrapper",
        props.title && "single-select",
        props.period && "select-period",
      )}
    >
      {props.title && (
        <label className={"form-label"} htmlFor={props.name}>
          {props.title}
        </label>
      )}

      {props.isAsyncList !== true && (
        <Select
          tabIndex={props.selectTabIndex}
          className={`f-select-container input ${props.className}`}
          options={props.options}
          type={props.type}
          value={props.value}
          classNamePrefix={`f-select`}
          name={props.name}
          isSearchable={false}
          closeMenuOnSelect={true}
          closeMenuOnScroll={false}
          //menuIsOpen={true}
          onFocus={() => {
            window.isInputFocus = true;
          }}
          {...props}
        />
      )}

      {props.isAsyncList === true && (
        <AsyncSelect
          tabIndex={props.selectTabIndex}
          getOptionLabel
          className={`f-select-container input ${props.className}`}
          options={props.options}
          loadOptions={props.loadOptions}
          isClearable={false}
          type={props.type}
          value={props.value}
          classNamePrefix={`f-select`}
          name={props.name}
          isSearchable={true}
          closeMenuOnSelect={true}
          closeMenuOnScroll={false}
          onFocus={() => {
            window.isInputFocus = true;
          }}
          {...props}
        />
      )}
    </div>
  );
}

SelectionNgoc.propTypes = {};

export default SelectionNgoc;
