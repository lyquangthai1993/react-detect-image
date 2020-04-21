import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./FormScanner.scss";
import CameraLayer from "../CameraLayer";
import { Formik } from "formik";
import { AxiosGet } from "../../utils/axios/axiosGet";
import TextBox from "../TextBox";
import BaseButton from "../BaseButton";
import * as Yup from "yup";
import { isEmpty } from "lodash";

const validateScannerForm = Yup.object().shape({
  serial: Yup.string().required("Barcode cannot be empty")
});
const FormScanner = props => {
  const formScanner = useRef();
  const {
    serial,
    setSerial,
    itemFound,
    setItemFound,
    itemDetail,
    setItemDetail
  } = props;
  
  useEffect(() => {
    if (
      !isEmpty(locationType) &&
      !isEmpty(itemStatus) &&
      !isEmpty(itemDetail)
    ) {
      const { productId = 0 } = itemDetail;
      AxiosGet(`Product/${productId}`, {})
        .then(res => {
          console.log("Product---------", res.data);
          setProductDetail(res.data);
        })
        .catch(error => {
          setProductDetail({});
        });
    }
  }, [locationType, itemStatus, itemDetail]);
  return (
    <div className={"form-scanner-wrapper"}>
      <div className={"form-submit"}>
        <CameraLayer
          onChangeCode={text => {
            setSerial(text);
            formScanner.current.submitForm();
          }}
        />
        <Formik
          ref={formScanner}
          initialValues={{
            serial
          }}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={validateScannerForm}
          onSubmit={values => {
            // todo: handle get api to this
            console.log("Scanner values: ", values);
            
            AxiosGet(
              "Item/GetItemBySerial",
              { ...values },
              { showPopup: false }
            )
              .then(res => {
                if (res.data) {
                  setItemDetail(res.data);
                  setItemFound("Founded");
                } else {
                  console.log(res.error.response);
                  const { data = {} } = res.error.response;
                  const { title } = data;
                  setItemFound(title);
                }
              })
              .catch(error => {
                setItemDetail({});
                setItemFound(false);
              });
          }}
          render={({
                     values,
                     errors,
                     touched,
                     handleChange,
                     handleBlur,
                     handleSubmit
                     /* and other goodies */
                   }) => (
            <form onSubmit={handleSubmit}>
              <div className={"barcode-enter"}>
                <div className={"paragraph-heading-charcoal mb-8"}>
                  Barcode:
                </div>
                <div className={"input-help-text mb-8"}>
                  Enter the barcode if you are having trouble with the
                  scanner.
                </div>
                <TextBox
                  placeholder={""}
                  value={values.serial}
                  name={"serial"}
                  error={errors.serial}
                  touched={touched.serial}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <BaseButton
                  className={"text-link-white"}
                  variant={"main"}
                  content={"Identify"}
                  type={"submit"}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

FormScanner.defaultProps = {};

FormScanner.propTypes = {
  serial: PropTypes.any
};

export default FormScanner;
