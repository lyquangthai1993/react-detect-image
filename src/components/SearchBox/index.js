/**
 *
 * Navbar
 *
 */

import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputGroup } from "react-bootstrap";
import ClassNames from "classnames";
import PropTypes from "prop-types";

const SearchBox = (props) => {
  const {
    theme = "",
    hidden = false,
    value = "",
    placeHolder = "Search for an active hire",
    onSearch = () => {
    },
    onClick = () => {
    }
  } = props;
  
  
  return (
      <div hidden={hidden}
           className={ClassNames(theme, "search-box-wrapper")}>
        <InputGroup>
          <FormControl
              value={value}
              placeholder={placeHolder}
              aria-label={placeHolder}
              className={"search-bar"}
              onChange={e => {
                onSearch(e.target.value);
              }}
          />
          <InputGroup.Append>
            <InputGroup.Text>
              <FontAwesomeIcon icon="search"
                               className={"icon icon-append cursor-pointer"}
                               onClick={() => {
                                 onClick(value);
                               }}/>
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </div>
  );
};
SearchBox.propTypes = {
  theme: PropTypes.string,
  hidden: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  onSearch: PropTypes.func,
  onClick: PropTypes.func,
};
export default SearchBox;
