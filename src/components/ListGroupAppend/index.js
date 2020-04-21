import ClassNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { ListGroup } from "react-bootstrap";
import "./style.scss";

const ListGroupAppend = props => {
  const {
    variant = "flush",
    listItem = [],
    appendIcon = "",
    theme = ""
  } = props;

  return (
    <div className={"list-group-append"}>
      <ListGroup variant={variant} className={theme}>
        {listItem.map((item, key) => {
          const {
            name = "",
            icon,
            theme = "",
            image = "",
            action = () => {}
          } = item;

          return (
            <ListGroup.Item
              action
              className={ClassNames(theme, "d-flex align-items-center")}
              key={key}
              onClick={e => {
                e.stopPropagation();
                action();
              }}
            >
              {image && (
                <div className={"prepend-icon"}>
                  <img src={image} alt={"prepend-icon"} className={""}/>
                </div>
              )}
              <div className={"name"}>{name}</div>
              <span className={"append-icon ml-auto"}>
                {icon || appendIcon}
              </span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

ListGroupAppend.propTypes = {
  variant: PropTypes.string,
  theme: PropTypes.string,
  listItem: PropTypes.array.isRequired,
  appendIcon: PropTypes.node
};

export default ListGroupAppend;
