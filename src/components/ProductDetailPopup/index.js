import React from "react";
import PropTypes from "prop-types";
import "./ProductDetailPopup.scss";
import ClassNames from "classnames";
import BaseButton from "../BaseButton";
import Modal from "react-bootstrap/Modal";
import ImgProduct from "../../images/product-detail.jpg";

const ProductDetailPopup = props => {
  const {
    show, close, centered, cancelText, className,
    productDetail,
    acceptText, accept = () => {
    }
  } = props;

  const { serialNumber = "", name = "", statusStr="" } = productDetail;
  const handleClose = () => close(false);
  const handleAccept = () => {
    handleClose();
    accept();
  };
  return (
    <Modal show={show}
      backdropClassName={"modal-warning-backdrop"}
      className={ClassNames("product-detail-popup-wrapper", className)}
      onHide={handleClose}
      backdrop={"static"}
      centered={centered}
    >
      <Modal.Header className={"text-center justify-content-center  border-0"}>
        <Modal.Title className={"paragraph-heading-charcoal"}>{name}</Modal.Title>
      </Modal.Header>

      <Modal.Body className={"paragraph-small border-0 text-center"}>
        <div className={"image-item mb-16"}>
          <span className={"helper"}/>
          <img alt={"img-detail"}
            className={"img-fluid"}
            src={productDetail && productDetail.image}
            onError={e => {
              e.target.onerror = null;
              e.target.src = ImgProduct;
            }} />
        </div>
        <div className={"d-flex flex-column"}>
          <div className="barcode d-flex justify-content-between mb-8">
            <div className={"paragraph-heading-charcoal"}>Barcode:</div>
            <div className={"p-base"}>{serialNumber}</div>
          </div>
          <div className="status d-flex justify-content-between">
            <div className={"paragraph-heading-charcoal"}>Status:</div>
            <div className={"p-base"}>{statusStr}</div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={"border-0 d-block"}>
        {acceptText &&
          <BaseButton className={"button-smalls-white btn-block"} variant="main" content={acceptText} onClick={handleAccept} />
        }
        {cancelText &&
          <BaseButton className={"button-smalls-white btn-block p-0"} variant="white" content={cancelText} onClick={handleClose} />
        }
      </Modal.Footer>
    </Modal>
  );
};

ProductDetailPopup.defaultProps = {
  productDetail: { productId: "", name: "", image: "", barcode: "" },
  show: false,
  centered: true,
  className: "",
  closeText: null,
  acceptText: null
};

ProductDetailPopup.propTypes = {
  productDetail: PropTypes.object,
  show: PropTypes.bool,
  className: PropTypes.string,
  cancelText: PropTypes.string,
  acceptText: PropTypes.string.isRequired,
  close: PropTypes.func,
  accept: PropTypes.func
};

export default ProductDetailPopup;
