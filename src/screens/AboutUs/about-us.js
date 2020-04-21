import React from "react";
import TemplateDetail from "../../components/TemplateDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import history from "../../utils/history";
import LogoBlue from "../../images/logo_about.png";
import "./about-us.scss";
import { openUrlInApp } from "../../utils/functionHelper";

const AboutUs = () => {
  return (
    <div className={"about-us-wrapper"}>
      <TemplateDetail
        textReturn={"Back"}
        iconReturn={
          <FontAwesomeIcon icon={"chevron-left"} className={"icon"}/>
        }
        titlePage={"About Permobil"}
        actionReturn={() => {
          history.goBack();
        }}
      >
        <div className={"detail"}>
          <div className={"text-center"}>
            <img alt={"logo"} className={"logo"} src={LogoBlue} />
          </div>
          <div className={"content paragraph-small"}>
            Permobil founder Dr. Per Uddén believed that helping people achieve
            the greatest level of independence is a basic human right and, for
            over 50 years, Permobil has held fast to that belief. Permobil is a
            global leader in advanced medical technology, passionate about
            better understanding our users’ needs and improving their quality of
            life through state-of-the-art healthcare solutions. Today, those
            solutions include power wheelchairs, seating and positioning
            products, power assist, and manual wheelchairs.
          </div>
          <div className={"d-flex flex-column"}>
            <div className={"d-flex"}>
              <div className={"label-small-charcoal"}>Email:</div>
              <div className={"underline text-link-small-blue"}>
                <a href="mailto: sales.nz@permobil.com">
                  sales.nz@permobil.com
                </a>
              </div>
            </div>
            <div className={"d-flex"}>
              <div className={"label-small-charcoal"}>Phone:</div>
              <div className={"underline text-link-small-blue"}>
                <a
                  href={"tel:+0800115222"}
                  className={"text-link-small-blue underline"}
                >
                  0800 115 222
                </a>
              </div>
            </div>
            <div className={"d-flex"}>
              <div className={"label-small-charcoal"}>Website:</div>
              <div
                className={"underline text-link-small-blue cursor-pointer"}
                onClick={() => openUrlInApp("http://www.permobil.co.nz/")}
              >
                www.permobil.co.nz
              </div>
            </div>
          </div>
        </div>
      </TemplateDetail>
    </div>
  );
};

AboutUs.propTypes = {};

export default AboutUs;
