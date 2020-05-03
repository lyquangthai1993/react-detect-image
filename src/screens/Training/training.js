import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Formik } from "formik";
import localForageApp from "localforage";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { routeLinks } from "../../app-routes";
import BaseButton from "../../components/BaseButton";
import ImageUploadMultiple from "../../components/ImageUploadMultiple";
import TemplateDetail from "../../components/TemplateDetail";
import TextBox from "../../components/TextBox";
import { AxiosPost } from "../../utils/axios/axiosPost";
import history from "../../utils/history";
import "./training.scss";

const validateForm = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  id: Yup.string().required("Name is required"),
  image: Yup.array()
    .required("Please select a image to continue.")
    .min(1, "Please select a image to continue.")
});

const Training = props => {
  const [urlWorking, setUrlWorking] = useState("");
  useEffect(() => {
    const setupAPILink = async () => {
      let temp = await localForageApp.getItem("apiURL");
      setUrlWorking(temp + routeLinks.training);
    };
    setupAPILink();
  }, []);
  const handleTraining = useCallback(
    (values) => {
      const { image = [], name, id } = values;
      let arrayPromise = [];

      image.map(itemImage => {
        let formData = new FormData();
        formData.set("name", name);
        formData.set("id", id);
        formData.set("image", itemImage);
        arrayPromise.push(AxiosPost(urlWorking, formData));
      });

      console.log(arrayPromise);
      // Promise.all(arrayPromise);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


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
              name: "",
              id: "",
              image: []
            }}
            validateOnBlur={true}
            validateOnChange={true}
            enableReinitialize={true}
            validationSchema={validateForm}
            onSubmit={values => {
              console.log(values);

              handleTraining(values);
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
              <form onSubmit={handleSubmit} className={"container"}>
                <div className={"intro-paragraph-blue"}>
                  Working in url: {urlWorking}
                </div>
                <TextBox
                  placeholder={""}
                  className={"d-none d-sm-block"}
                  label={"Name"}
                  value={values.name}
                  name={"name"}
                  error={errors.name}
                  touched={touched.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <TextBox
                  placeholder={""}
                  className={"d-none d-sm-block"}
                  label={"ID"}
                  value={values.id}
                  name={"id"}
                  error={errors.id}
                  touched={touched.id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FieldArray
                  name={"image"}
                  render={() =>
                    <ImageUploadMultiple
                      className={"mb-8"}
                      value={values.image}
                      error={errors.image}
                      touched={touched.image}
                      onRemove={index => {
                        let temp = [...values.image];
                        temp.splice(index, 1);
                        setFieldValue("image", temp);
                      }}
                      onDone={files => {
                        console.log(files);
                        setFieldValue("image", values.image.concat(files.map(f => f.base64)));
                      }}/>
                  }/>

                <BaseButton
                  className={"text-link-white btn-add-product d-inline-block"}
                  variant={"main"}
                  inline={true}
                  content={"Save"}
                  type={"submit"}
                />

                <pre>{JSON.stringify(values, undefined, 2)}</pre>
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
