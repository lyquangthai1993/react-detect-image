import ClassNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import Minus from "../../images/minus.svg";
import avatar from "../../images/user.svg";
import { routeLinks } from "../../app-routes";
import "./style.scss";

function ProductItemQty(props) {
  const {
    productId = "",
    className = "",
    description = "",
    name = "",
    image = "",
    removeProduct = () => {
    }
  } = props;

  return (
    <div className={ClassNames("product-item-wrapper", className)}>
      <div className={"product-detail d-flex"}>
        <div className={"image-block"}>
          <div
            className={
              "image-cropper image align-self-center image-center-vertical"
            }
          >
            <span className={"helper"}/>
            <img
              src={image}
              alt="avatar"
              onError={e => {
                e.target.onerror = null;
                e.target.src = avatar;
              }}
            />
          </div>
        </div>
        <div className={"product-name"}>
          <div
            className={ClassNames(
              "p-base name d-inline-block align-middle align-self-center"
            )}
          >
            <div className={"intro-paragraph"}>{name}</div>
            <Link
              to={{
                pathname: routeLinks.productDetail.replace(":id", productId),
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
                "learn-more text-link-small-blue underline ml-auto text-nowrap align-self-center"
              }
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
      <div className={"qty-block align-self-center"}>
        <img
          alt={"minus"}
          className={"cursor-pointer"}
          src={Minus}
          onClick={() => {
            removeProduct({ ...props });
          }}
        />
      </div>
    </div>
  );
}

ProductItemQty.propTypes = {};

export default ProductItemQty;
