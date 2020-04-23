import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import BurgerMenu from "../../components/BurgerMenu";
import FooterCall from "../../components/footer/footerCall";
import Header from "../../components/header/header";
import "./home.scss";
const validateForm = Yup.object().shape({
  // name: Yup.string().required("Name is required")
});
const Home = () => {
  // const permissionCheck = new Permission(permissions);
  const [searchTextState, setSearchTextState] = useState("");
  const [apiURL, setApiURL] = useState(initialState)
  useEffect(() => {
    localFor
    
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
      <Formik
        initialValues={{}}
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
        validationSchema={validateForm}
        onSubmit={e => {}}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => <form onSubmit={handleSubmit}></form>}
      </Formik>

      <FooterCall className={"bottom"} />
    </div>
  );
};
Home.propTypes = {
  role: PropTypes.string
};
export default React.memo(Home);
