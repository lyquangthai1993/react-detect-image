import PropTypes from "prop-types";
import React from "react";
import ClassNames from "classnames";
import {Button, ButtonGroup} from "react-bootstrap";
import TextBox from "../TextBox";
import "./style.scss";

const elementOption = ({
  sizeRequirementId,
  value,
  options = ["Left", "Middle", "Right"],
  setFieldValue,
  setFieldTouched,
  handleBlur,
  handleChange,
  name,
  error,
  touched,
}) => {
  console.log("elementOption", sizeRequirementId >= 2 && parseInt(process.env.REACT_APP_SHOW_PRODUCT_SIZE));
  switch (sizeRequirementId >= 2 && parseInt(process.env.REACT_APP_SHOW_PRODUCT_SIZE)) {
    case 2: //OPTION
      return (
        <div className={"product-option d-flex justify-content-between flex-column"}>
          <ButtonGroup
            className={ClassNames("size-option-group btn-group-justify", {error: error && touched})}
            onClick={(event) => {
              event.preventDefault();
              setFieldValue(name, event.target.attributes.getNamedItem("data-key").value);
              setFieldTouched(name, true);
            }}
          >
            {options.map((op, index) => (
              <Button
                key={index}
                data-key={op}
                variant={ClassNames("outline-main", {active: op === value})}
                className={ClassNames("button-link-blue")}
              >
                {op}
              </Button>
            ))}
          </ButtonGroup>
          {touched && error && <div className="input-field-error">{error}</div>}
        </div>
      );
    case 3: //TEXT
      return (
        <TextBox
          placeholder={"Describe size"}
          value={value}
          name={name}
          error={error}
          touched={touched}
          format={false}
          type={"text"}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );

    default:
      return;
  }
};
const SizeOption = (props) => {
  const {sizeRequirementId = 0} = props;
  return (
    <div className={"size-option-wrapper"}>
      {sizeRequirementId >= 2 && <div className={"label label-small-charcoal"}>Size</div>}
      <div>{elementOption(props)}</div>
    </div>
  );
};

SizeOption.propTypes = {
  sizeRequirementId: PropTypes.number,
};

export default SizeOption;
