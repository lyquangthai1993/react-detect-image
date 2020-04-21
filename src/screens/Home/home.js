import PropTypes from "prop-types";
import React, { useState } from "react";
import BurgerMenu from "../../components/BurgerMenu";
import FooterCall from "../../components/footer/footerCall";
import Header from "../../components/header/header";
import "./home.scss";

const Home = () => {
  // const permissionCheck = new Permission(permissions);
  const [searchTextState, setSearchTextState] = useState("");

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

      <FooterCall className={"bottom"} />
    </div>
  );
};
Home.propTypes = {
  role: PropTypes.string,
};
export default React.memo(Home);
