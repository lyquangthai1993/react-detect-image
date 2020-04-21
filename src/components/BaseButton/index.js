/**
 *
 * BaseButton
 *
 */
import React from "react";
import PropTypes from "prop-types";
// import styled from 'styled-components';
import { Button } from "react-bootstrap";
import "./style.scss";
import ClassNames from "classnames";

function BaseButton(props) {
  const {
    content = "",
    variant = "",
    className = "",
    inline = false,
  } = props;
  return (
    <div className={ClassNames("base-button", { "d-inline-block": inline })}>
      <Button
        {...props}
        variant={variant}
        className={ClassNames(className)}
      >{content}
      </Button>
    </div>
  );
}

BaseButton.propTypes = {
  content: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
};

export default BaseButton;
