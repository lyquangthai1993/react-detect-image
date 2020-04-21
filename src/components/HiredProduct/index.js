import React from "react";
import "./HiredProduct.scss";
import product from "../../images/product.png";
import * as PropTypes from "prop-types";
import ClassNames from "classnames";

const HiredProduct = props => {
  const { className, products, showTitle } = props;
  return (
    <div className={ClassNames("hired-product-wrapper bg-light-periwinkle padding-lr-responsive", className)}>
      {showTitle && <h3 className={"h3-blue"}>Hired products</h3>}
      {products.map(pro => {
        const { name = "", image = "", barCode = "" } = pro;
        return (<div className={"data-item"}>
          <div className={"p-base d-flex justify-content-between"}>
            <div className={""}>
              <div className={"image-cropper image-product image-center-vertical"}>
                <span className={"helper"}/>
                <img src={image} alt="avatar"
                     className=""
                     onError={e => {
                    e.target.onerror = null;
                    e.target.src = product;
                  }} />
              </div>
            </div>
            <div className={"flex-fill align-self-center"}>
              <div className={"name"}>
                {name}
              </div>
            </div>
            <div className={"flex-fill align-self-center"}>
              <div className={"text-right align-self-center"}>{barCode}</div>
            </div>

          </div>
        </div>);
      })}
    </div>
  );
};

HiredProduct.defaultProps = {
  showTitle: true,
  className: "",
  products: []
};

HiredProduct.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
  showTitle: PropTypes.bool
};

export default HiredProduct;
