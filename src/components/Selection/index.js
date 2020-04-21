import ClassNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IndicatorsContainer = props => {
  return (
    <div style={{ background: "transparent" }}>
      <components.IndicatorsContainer {...props} className={"thai"}/>
    </div>
  );
};

const DropdownIndicator = (props) => {
  const { selectProps = {} } = props;
  const { showArrow = false, menuIsOpen = false } = selectProps;
  
  return (showArrow ?
      <components.DropdownIndicator {...props}>
        <div className={"color-charcoal-grey"}>
          <FontAwesomeIcon icon={!menuIsOpen ? "chevron-down" : "chevron-up"}/>
        </div>
      </components.DropdownIndicator>
      :
      null
  
  );
};

const IndicatorSeparator = ({ innerProps }) => {
  return <span style={{ display: "none" }} {...innerProps} />;
};

// const Input = props => {
//   if (props.isHidden) {
//     return <components.Input {...props} />;
//   }
//   return (
//       <TextBox {...props} />
//   );
// };

const ControlComponent = props => (
  <div className={"control-wrapper"}>
    <components.Control {...props} className={"control"}/>
  </div>
);

const Placeholder = props => {
    const { selectProps = {} } = props;
    return <components.Placeholder {...props} className={ClassNames("placeholder-wrapper", selectProps.error && selectProps.touched && "error-text")}/>;
  }
;

const customStyles = {
  control: (base, state) => ({
    ...base,
    "&:hover": { borderColor: "#a7a9ac" }, // border style on hover
    border: "1px solid #a7a9ac", // default border color
    boxShadow: "none" // no box-shadow
  })
};

const Selection = (props) => {
  return (
    <div className={ClassNames(
      "selection",
      "form-input",
      props.touched && props.error && "error"
    )}>
      {props.label && <label className={"paragraph-heading-charcoal"}>
        {props.label}
      </label>
      }
      {props.isAsyncList ?
        <AsyncSelect
          {...props}
          components={{
            IndicatorsContainer,
            DropdownIndicator,
            IndicatorSeparator,
            Control: ControlComponent
          }}
          styles={customStyles}
          isDisabled={props.disabled}
          className={ClassNames("f-select-container", props.touched && props.error && "error-form")}
          // options={props.options}
          loadOptions={props.loadOptions}
          isClearable={props.isClearable}
          type={props.type}
          value={props.value}
          classNamePrefix={`f-select`}
          blurInputOnSelect
          name={props.name}
          placeholder={props.placeholder || "Search ..."}
          isSearchable={true}
          closeMenuOnSelect={true}
          closeMenuOnScroll={false}
          cacheOptions
          defaultOptions
          getOptionLabel={props.getOptionLabel}
          getOptionValue={props.getOptionValue}
          onBlur={props.onBlur}
          onFocus={() => {
            window.isInputFocus = true;
          }}
        />
        :
        <Select
          {...props}
          styles={customStyles}
          value={props.value}
          isSearchable={props.isSearchable}
          options={props.options}
          name={props.name}
          className={`f-select-container`}
          placeholder={props.placeholder || "Please select one"}
          components={{
            IndicatorsContainer,
            DropdownIndicator,
            IndicatorSeparator,
            Control: ControlComponent,
            Placeholder
          }}
          onChange={e => {
            props.onChange(e);
          }}
        />}
      
      
      {props.touched && props.error && <div className="input-field-error">{props.error}</div>}
    </div>
  );
};

Selection.defaultProps = {
  showArrow: true,
  placeholder: ""
};

Selection.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  isAsyncList: PropTypes.bool,
  showArrow: PropTypes.bool,
  isSearchable: PropTypes.bool
};

export default Selection;
