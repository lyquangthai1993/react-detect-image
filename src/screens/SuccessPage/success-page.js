import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import BaseButton from "../../components/BaseButton";
// Images assets
import FooterCall from "../../components/footer/footerCall";
import logoWhite from "../../images/Permobil_White.png";
import history from "../../utils/history";
import "./success-page.scss";

const SuccessPage = (props) => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { heading = "", sub = "", menu } = state;
  console.log("SuccessPage state from location-----------", state);
  return (
      <div className={"success-page-wrapper"}>
        <div className={"logo-block"}>
          <img className={"logo"} alt={"logo"} src={logoWhite}/>
        </div>
        <div className={"content"}>
          <div className={'border-block'}>
          {heading && <h1 className={"h1-white"}>{heading}</h1>}
          {sub && <h3 className={"h3-screen-heading"}>{sub}</h3>}
          </div>
          {menu && JSON.parse(menu).map((m, index) => {
            const {
              label = "", link = ""
            } = m;
            
            return <BaseButton key={index}
                               content={<div>{label} <FontAwesomeIcon icon={["far", "arrow-alt-circle-right"]}
                                                                      className={"icon float-right"}/></div>}
                               onClick={(e) => {
                                 e.preventDefault();
                                 link && history.push(link);
                               }}
                               className={"btn-block text-left p-0 button-link-white"}
                               variant={"transparent"}/>;
          })}
        
        </div>
        <FooterCall className={"bottom paragraph-small"}/>
      </div>
  );
};
SuccessPage.defaultProps = {};
SuccessPage.propTypes = {
  location: PropTypes.any,
  menu: PropTypes.array
};

export default SuccessPage;
