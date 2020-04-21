import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./SearchResultPreview.scss";
import { isArray } from "lodash";
import ListLabelGroup from "../ListLabelGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import * as Yup from "yup";
import BaseButton from "../BaseButton";
import TextBox from "../TextBox";
import { routeLinks } from "../../app-routes";
import history from "../../utils/history";
import { SearchDataContext } from "../../store/SearchData/context";
import { getListHireDataAPI } from "../../utils/functionHelper";

const validationSchema = Yup.object().shape({
  additionalSearchTerm: Yup.string().required("Please provide a search term")
});

const SearchResultPreview = props => {
  const { products, isSearching } = props;
  const [searchDataState, searchDataDispatch] = useContext(SearchDataContext);
  const logicShow = () => {
    if (isArray(products))
      switch (products.length) {
        case 0: {
          // NO RESULTS
          return (
            <div className={"empty"}>
              <div className={"intro-paragraph text-center"}>
                Sorry, no results found.
                <br/>
                Please try again.
              </div>
            </div>
          );
        }
        //SINGLE
        case 1: {
          return (
            <div className={"single-result"}>
              <ListLabelGroup
                theme={"white"}
                listItem={products.map(pro => {
                  const {
                    clientName = "",
                    requisitionOrder = "",
                    hireId = ""
                  } = pro;
                  return {
                    ...pro,
                    name: (
                      <div>
                        <div className={"intro-paragraph-blue"}>
                          {clientName}
                        </div>
                        <div className={"label-small-blue"}>
                          Requisition/PO #:{" "}
                          <span className={"paragraph-small"}>
                            {requisitionOrder}
                          </span>
                        </div>
                      </div>
                    ),
                    hideAvatar: true,
                    icon: (
                      <FontAwesomeIcon
                        icon={"chevron-right"}
                        className={"icon color-dusk-blue"}
                      />
                    ),
                    action: () => {
                      history.push(
                        routeLinks.hireDetail.replace(":id", hireId)
                      );
                    },
                  };
                })}
              />
            </div>
          );
        }
        //MULTIPLE
        default: {
          return (
            <div className={"multiple-result"}>
              <Formik
                initialValues={{
                  additionalSearchTerm: ""
                }}
                enableReinitialize={true}
                validateOnChange={true} // !!!DO NOT CHANGE
                validateOnBlur={true}
                validationSchema={validationSchema}
                onSubmit={values => {
                  //  todo: !HANDLE LOGIC CALL API TO GET NAROW SEARCH RESULTS TO HANDLE CORRECT
                  console.log("Submit narow search", values);
                  getListHireDataAPI(
                    {
                      ...searchDataState.params,
                      search: values.additionalSearchTerm
                    },
                    searchDataDispatch
                  );
                }}
                render={({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                           setFieldValue
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={"introduction"}>
                      <div className={"label paragraph-heading-charcoal"}>
                        Multiple results found
                      </div>
                      <div className={"description input-help-text"}>
                        Please provide one of the following to narrow down your
                        search: NHI, Requisition order, Product serial
                      </div>
                    </div>
                    <TextBox
                      placeholder={""}
                      label={"Additional search term"}
                      value={values.additionalSearchTerm}
                      name={"additionalSearchTerm"}
                      error={errors.additionalSearchTerm}
                      touched={touched.additionalSearchTerm}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
      
                    <div className={"submit-block one-button"}>
                      <BaseButton
                        className={"text-link-white btn-add-product w-100"}
                        variant={"main"}
                        content={"Narrow search"}
                        type={"submit"}
                      />
                    </div>
                  </form>
                )}
              />
            </div>
          );
        }
      }
    else return null;
  };
  return (
    <div className={"search-result-preview-wrapper"}>
      {isSearching ? (
        <div className={"text-center"}>Loading...</div>
      ) : (
        logicShow()
      )}
    </div>
  );
};

SearchResultPreview.defaultProps = {
  products: [],
  isSearching: false
};

SearchResultPreview.propTypes = {
  products: PropTypes.array,
  isSearching: PropTypes.bool
};

export default SearchResultPreview;
