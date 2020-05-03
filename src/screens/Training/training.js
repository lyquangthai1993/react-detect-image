import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import FileBase64 from "react-file-base64";
import * as Yup from "yup";
import TemplateDetail from "../../components/TemplateDetail";
import history from "../../utils/history";
import "./training.scss";
const validateForm = Yup.object().shape({
    // name: Yup.string().required("Name is required")
  });

const Training = props => {
  return (
    <div className={"training-wrapper"}>
      <TemplateDetail
        textReturn={"Back"}
        iconReturn={
          <FontAwesomeIcon icon={"chevron-left"} className={"icon"} />
        }
        titlePage={"Training"}
        isHideBurgerMobile={false}
        actionReturn={() => {
          history.goBack();
        }}
      >
        <div>
          <Formik
            initialValues={{
              image: []
            }}
            validateOnBlur={true}
            validateOnChange={true}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={values => {
 
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <FileBase64
                  multiple={true}
                  onDone={files => {
                      console.log(files)
                    setFieldValue()
                  }}
                />
              </form>
            )}
          </Formik>
        </div>
      </TemplateDetail>
    </div>
  );
};

Training.defaultProps = {};

Training.propTypes = {
  temp: PropTypes.any
};

export default Training;
