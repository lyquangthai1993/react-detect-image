import React from "react";
//Lib
import DatePicker from "react-datepicker";
import "./style.scss";
import "../TextBox/style.scss";
import ClassNames from "classnames";
import TextBox from "../TextBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomInput = (cusProps) => {
  
  const { touched, error } = cusProps;
  return (<TextBox {...cusProps}
                   readOnly={true}
                   classNameAppend={"white"}
                   classNameInput={"br-tpr"}
                   appendLabel={<FontAwesomeIcon icon={["far", "calendar-alt"]}
                                                 className={touched && error ? "color-error" : "color-dusk-blue"}/>}
  />);
  
};
const Datepicker = (props) => {
  const {
    name = "",
    isHidden = false,
    className = "",
    selected,
    touched = false,
    error = "",
    minDate,
    maxDate,
    //------------Time---------
    minTime,
    maxTime,
    showTimeSelectOnly = false,
    showTimeSelect = false,
    //----------Month-----------
    showMonthDropdown = false,
    //-----------Year--------------
    showYearDropdown = false,
    scrollableYearDropdown = true,
    yearDropdownItemNumber = 15,
    dateFormat = "MM/dd/yyyy",
    placeholderText = "Select a date",
    popperPlacement = "bottom-start",
    prependLabel = "",
    onSelect = (e) => {
    }
  } = props;
  
  
  return (
      <div className={ClassNames("date-picker-wrapper form-input", { "hidden": isHidden })}>
        {/*{label && <label className={"paragraph-heading-charcoal"}>{label}</label>}*/}
        <DatePicker
            {...props}
            popperPlacement={popperPlacement}
            popperModifiers={{
              flip: {
                enabled: true
              },
              preventOverflow: {
                enabled: false,
                escapeWithReference: false,
                boundariesElement: "viewport"
              }
            }}
            touched={touched}
            error={error}
            name={name}
            className={ClassNames("", className, touched && error && "error-form")}
            prependLabel={prependLabel}
            selected={selected}
            minDate={minDate}
            maxDate={maxDate}
            minTime={minTime}
            maxTime={maxTime}
            placeholderText={placeholderText}
            //Time
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="Time"
            //Month
            showMonthDropdown={showMonthDropdown}
            dropdownMode="select"
            //Year
            showYearDropdown={showYearDropdown}
            scrollableYearDropdown={scrollableYearDropdown}
            yearDropdownItemNumber={yearDropdownItemNumber}
            //--------
            dateFormat={dateFormat}
            customInput={<CustomInput {...props}/>}
            onSelect={date => {
              onSelect(date);
            }}
        />
      
      </div>
  );
};
export default Datepicker;
