import { Formik } from "formik";
import localForageApp from "localforage";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import BaseButton from "../../components/BaseButton";
import BurgerMenu from "../../components/BurgerMenu";
import FooterCall from "../../components/footer/footerCall";
import Header from "../../components/header/header";
import TextBox from "../../components/TextBox";
import "./home.scss";
const validateForm = Yup.object().shape({
  // name: Yup.string().required("Name is required")
});
const Home = () => {
  // const permissionCheck = new Permission(permissions);
  const [searchTextState, setSearchTextState] = useState("");

  const [apiURL, setApiURL] = useState("");
  useEffect(() => {
    const setupAPILink = async () => {
      let temp = await localForageApp.getItem("apiURL");
      console.log(temp);
      setApiURL(temp || "http://");
    };
    setupAPILink();
  }, []);

  return (
    <div className={"home-wrapper"} id={"home_page"}>
      <BurgerMenu
        outerContainerId={"app"}
        pageWrapId={"home_page"}
        searchText={searchTextState}
        onSearch={text => {
          setSearchTextState(text);
        }}
      />

      <Header />

      <div className="container">
        <Formik
          initialValues={{
            apiURL
          }}
          validateOnBlur={true}
          validateOnChange={true}
          enableReinitialize={true}
          validationSchema={validateForm}
          onSubmit={values => {
            const { apiURL = "" } = values;
            localForageApp.setItem("apiURL", apiURL);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <TextBox
                placeholder={""}
                className={"d-none d-sm-block"}
                label={"API URL"}
                value={values.apiURL}
                name={"apiURL"}
                error={errors.apiURL}
                touched={touched.apiURL}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <BaseButton
                className={"text-link-white btn-add-product d-inline-block"}
                variant={"main"}
                inline={true}
                content={"Save"}
                type={"submit"}
              />
            </form>
          )}
        </Formik>
      </div>
      <FooterCall className={"bottom"} />
    </div>
  );
};
Home.propTypes = {
  role: PropTypes.string
};
export default Home;
