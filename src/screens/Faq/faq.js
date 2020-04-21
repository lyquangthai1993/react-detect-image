import React, { useState } from "react";
import "./faq.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TemplateDetail from "../../components/TemplateDetail";
import TemplateMenuLeft from "../../components/TemplateMenuLeft";
import history from "../../utils/history";
import * as PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowResize";
import _ from "lodash";
import ListLabelGroup from "../../components/ListLabelGroup";
import ClassNames from "classnames";

const Faq = props => {
  const { listQuestions } = props;
  
  const [questionDetailState, setQuestionDetailState] = useState({});
  const [titlePageState,] = useState("Frequently asked questions");
  const [textReturnState, setTextReturnState] = useState("Back");
  const windowSize = useWindowSize();
  return (
      <div className={ClassNames("faq-wrapper", { "is-mobile": windowSize.width <= 575 })}>
        <TemplateDetail textReturn={textReturnState}
                        isHideBurgerMobile={false}
                        iconReturn={<FontAwesomeIcon icon={"chevron-left"} className={"icon"}/>}
                        titlePage={titlePageState}
                        actionReturn={() => {
                          if (_.isEmpty(questionDetailState) || windowSize.width > 575) {
                            history.goBack();
                          } else {
                            setQuestionDetailState({});
                            setTextReturnState("Back");
                          }
                        }}
        >
          <div className={"content"}>
            <TemplateMenuLeft
                leftSideComponent={
                  <div hidden={windowSize.width <= 575 && !_.isEmpty(questionDetailState)}>
                    <ListLabelGroup
                        hideImage={true}
                        listItem={_.isEmpty(listQuestions) ? [] : listQuestions.map(t => {
                          const { name = "", image = "" } = t;
                          return {
                            className: ClassNames(JSON.stringify(t) === JSON.stringify(questionDetailState) ? "active" : "",
                                'padding-lr-responsive'),
                            name,
                            image: image || "",
                            icon: <FontAwesomeIcon icon={"chevron-right"} className={"icon color-dusk-blue"}/>,
                            action: () => {
                              if (windowSize.width <= 575) {
                                setTextReturnState("FAQs");
                              }
                              setQuestionDetailState(t);
                            }
                          };
                        })}
                    />
                  </div>
                }
                rightSideComponent={<div className={"content"}>
                  {!_.isEmpty(questionDetailState) ?
                      <div>
                        <div className={"intro-paragraph d-sm-none"}>
                          {questionDetailState.name}
                        </div>
                        <div className={"p-base"}>
                          {questionDetailState.content}
                        </div>
                      </div>
                      : null
                  }
                </div>}/>
          </div>
        </TemplateDetail>
      </div>
  );
};

Faq.defaultProps = {
  listQuestions: [
    {
      name: "Frequently asked question one?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question two  ?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question three?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question four?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question five?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question six?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question seven?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
    {
      name: "Frequently asked question eight?",
      content: "The ROHO MID PROFILE Single Compartment Cushion with Sensor Ready Technology is an adjustable, air-filled, cellular-design, wheelchair support surface that utilizes DRY FLOATATION® Technology and is intended to conform to an individual’s seated shape to provide skin/soft tissue protection and an environment to facilitate wound healing."
    },
  ]
};

Faq.propTypes = {
  listQuestions: PropTypes.array
};

export default Faq;
