import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import "./style.scss";
import ClassNames from "classnames";
import avatar from "../../images/user.svg";
import { Link } from "react-router-dom";
import { routeLinks } from "../../app-routes";
import { isFunction } from "lodash";

const ListLabelGroup = props => {
  const {
    variant = "flush",
    listItem = [],
    appendIcon = "",
    theme = "grey",
    labelGroup = "",
    hideImage = false,
    classNameOfLabel = "",
    loading = false,
    showEmpty
  } = props;

  return (
    <div className={"list-label-group"}>
      {labelGroup && (
        <div className={ClassNames("label-group", "button-link-white")}>
          {labelGroup}
        </div>
      )}
      {listItem.length ? (
        <ListGroup variant={variant} className={theme}>
          {listItem.map((item, index) => {
            const {
              productId = "",
              name = "",
              icon,
              theme = "",
              image = "",
              description = "",
              isLearnMore = false,
              className = "",
              action = () => {
              }
            } = item;

            return (
              <ListGroup.Item
                action={isFunction(action)}
                type={"button"}
                className={ClassNames(theme, className)}
                key={index}
                onClick={e => {
                  e.stopPropagation();
                  isFunction(action) && action(e, index, item);
                }}
              >
                <div className={"d-flex align-items-center"}>
                  {!hideImage && (
                    <div className={"align-self-start"}>
                      <div className={"image-block image-center-vertical"}>
                        <span className={"helper"}/>
                        <img
                          src={image}
                          alt="avatar"
                          className={"image"}
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src = avatar;
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div className={ClassNames("flex-fill")}>
                    <div className={"p-base name text-left"}>
                      <div
                        className={
                          "name-with-learn-more d-sm-flex align-items-center"
                        }
                      >
                        <div className={ClassNames("name", classNameOfLabel)}>
                          {name}
                        </div>
                        {isLearnMore ? (
                          <Link
                            to={{
                              pathname: routeLinks.productDetail.replace(
                                ":id",
                                productId
                              ),
                              state: {
                                id: productId,
                                productDetail: {
                                  productId,
                                  name,
                                  image,
                                  description
                                }
                              }
                            }}
                            className={
                              "learn-more text-link-small-blue underline ml-auto text-nowrap"
                            }
                          >
                            Learn more
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={"icon-block"}>
                      <span className={"append-icon"}>
                        {icon || appendIcon}
                      </span>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <ListGroup.Item className={"empty"}>
          {loading ? "Loading..." : showEmpty ? "Empty" : ""}
        </ListGroup.Item>
      )}
    </div>
  );
};
ListLabelGroup.defaultProps = {
  hideImage: false,
  loading: false,
  showEmpty: true
};
ListLabelGroup.propTypes = {
  labelGroup: PropTypes.string,
  classNameOfLabel: PropTypes.string,
  variant: PropTypes.string,
  theme: PropTypes.string,
  listItem: PropTypes.array,
  appendIcon: PropTypes.node,
  hideImage: PropTypes.bool,
  loading: PropTypes.bool,
  showEmpty: PropTypes.bool
};

export default ListLabelGroup;
