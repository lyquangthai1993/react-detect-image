import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import { FieldArray, Formik } from "formik";
import _ from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { routeLinks } from "../../app-routes";
import AuthContext from "../../auth/authContext";
import BaseButton from "../../components/BaseButton";
import { Checkbox } from "../../components/Checkbox";
import Datepicker from "../../components/Datepicker";
import HiredProduct from "../../components/HiredProduct";
import ListLabelGroup from "../../components/ListLabelGroup";
import ModalWarning from "../../components/ModalWarning/ModalWarning";
import PatientWeight from "../../components/PatientWeight";
import ProductItemQty from "../../components/ProductItemQty";
import { RadioList } from "../../components/RadioList";
import SearchBox from "../../components/SearchBox";
import Selection from "../../components/Selection";
import Signature from "../../components/Signature";
import SizeOption from "../../components/SizeOption/sizeOption";
import TemplateDetail from "../../components/TemplateDetail";
import TextBox from "../../components/TextBox";
import usePermission from "../../hooks/usePermission";
import useRefreshLookupData from "../../hooks/useRefreshLookupData";
import CantFindIcon from "../../images/icon/cant_find.svg";
import * as CREATE_HIRE_ACTIONS from "../../store/CreateHireData/createHireActions";
import * as CREATE_HIRE_DATA_ACTION_TYPES from "../../store/CreateHireData/createHireDataActionTypes";
import { CreateHireDataContext } from "../../store/CreateHireData/createHireDataContext";
import * as LOOKUP_DATA_ACTIONS from "../../store/LookupData/lookupDataActions";
import { LookupDataContext } from "../../store/LookupData/lookupDataContext";
import { AxiosGet } from "../../utils/axios/axiosGet";
import { AxiosPost } from "../../utils/axios/axiosPost";
import { openUrlInApp } from "../../utils/functionHelper";
import history from "../../utils/history";
import "./create-hire.scss";
import {
  clientName,
  nhi,
  requisitionOrder,
  requisitionOrderClinician
} from "./validateSchema";
import momentTimeZone from "../../utils/moment";

//STEP ONE
const validateStepOne = Yup.object().shape({
  hireLine: Yup.array()
    .required("Please select a product to continue.")
    .min(1, "Please select a product to continue.")
});

//STEP TWO
const validateStepTwo = Yup.object().shape({
  isVisibleWeight: Yup.boolean(),
  clientWeight: Yup.number()
    // .required("Patient weight cannot be empty")
    // .positive("Please provide the clients weight."),

    .when("isVisibleWeight", {
      is: true,
      then: Yup.number()
        .required("Patient weight cannot be empty")
        .positive("Please provide the clients weight.")
    }),
  hireLine: Yup.array()
    .of(
      Yup.object().shape({
        sizeRequirementId: Yup.number(),
        selectedSize: Yup.mixed().when(
          "sizeRequirementId",
          sizeRequirementId => {
            switch (sizeRequirementId) {
              case 2:
                return Yup.string()
                  .nullable()
                  .required(`Size can not be empty`);
              //  !using temp upper text, correct is below text
              // .required(`Please select a preferred product size.`);
              case 3:
                return Yup.string()
                  .nullable()
                  .required(`Size can not be empty`);

              default:
                return Yup.mixed();
            }
          }
          // {
          //   is: (sizeRequirementId) => sizeRequirementId >= 2, // !CHANGE THIS LINE IF LOGIC FOR CHECK CAN'T CORRECT
          //   then: Yup.string()
          //       .nullable()
          //       .required(`Size can not be empty`)
          // }
        )
      })
    )
    .min(1, "Product need selected at least one")
});

//STEP THREE
const validateStepThreeClinician = Yup.object().shape({
  nhi,
  clientName,
  requisitionOrder: requisitionOrderClinician,
  startDate: Yup.string().required("Rental start date cannot be empty")
});
const validateStepThreeTechnician = Yup.object().shape({
  // clientPhone: Yup.string()
  //   .atLeastOneOf([
  //     {
  //       label: "Phone",
  //       field: "clientPhone"
  //     },
  //     {
  //       label: "Email",
  //       field: "clientEmail"
  //     }]),
  // clientEmail: Yup.string().email("Email is invalid")
  //   .atLeastOneOf([
  //     {
  //       label: "Phone",
  //       field: "clientPhone"
  //     },
  //     {
  //       label: "Email",
  //       field: "clientEmail"
  //     }]),
  clientPhone: Yup.string(),
  clientEmail: Yup.string().email("Wrong format email"),
  clientName,
  requisitionOrder,
  customerId: Yup.string().required("Customer cannot be empty"),
  locationId: Yup.string().required("Location cannot be empty"),
  startDate: Yup.string().required("Rental start date cannot be empty"),
  nhi,
  externalAddress: Yup.boolean(),
  streetAddress: Yup.string().when("externalAddress", {
    is: true,
    then: Yup.string().required("Street address cannot be empty")
  }),
  city: Yup.string().when("externalAddress", {
    is: true,
    then: Yup.string().required("City cannot be empty")
  }),
  suburb: Yup.string().when("externalAddress", {
    is: true,
    then: Yup.string().required("Suburb cannot be empty")
  }),
  postCode: Yup.string().when("externalAddress", {
    is: true,
    then: Yup.string().required("Postcode cannot be empty")
  }),
  isPermissionClientInfo: Yup.boolean().oneOf(
    [true],
    "Agree terms must be checked"
  )
});
const validateStepThreePermobil = Yup.object().shape({
  clientPhone: Yup.string().atLeastOneOf([
    {
      label: "Phone",
      field: "clientPhone"
    },
    {
      label: "Email",
      field: "clientEmail"
    }
  ]),
  clientEmail: Yup.string()
    .email("Email is invalid")
    .atLeastOneOf([
      {
        label: "Phone",
        field: "clientPhone"
      },
      {
        label: "Email",
        field: "clientEmail"
      }
    ]),
  clientName,
  startDate: Yup.string().required("Rental start date cannot be empty"),
  nhi,
  streetAddress: Yup.string().required("Street address cannot be empty"),
  city: Yup.string().required("City cannot be empty"),
  suburb: Yup.string().required("Suburb cannot be empty"),
  postCode: Yup.string().required("Postcode cannot be empty")
});
//STEP FOUR
const validateStepFourPermobil = Yup.object().shape({
  signature: Yup.string().required(
    "You must agree to our Term & Conditions by providing your signature."
  )
});
// ------- end Yup setting ----------------

const CreateHire = () => {
  useRefreshLookupData(["Category", "Bundle", "Location"]);
  const authContext = useContext(AuthContext);
  const { authState = {} } = authContext;
  const { profile = {} } = authState;
  const getData = useCallback(async url => {
    const result = await AxiosGet(url);

    if (result.error === null) {
      return result.data;
    } else {
      return [];
    }
  }, []);
  const [showCancel, setShowCancel] = useState(false);
  const showSuccessAddProduct = () => {
    toast.success(
      <div>
        <FontAwesomeIcon icon={["far", "check-circle"]} className={"icon"} />{" "}
        Products added to hire
      </div>,
      {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
        className: "my-toast bg-cerulean text-center",
        bodyClassName: "my-toast-body"
      }
    );
  };
  const [lookupDataState, lookupDataDispatch] = useContext(LookupDataContext);
  const [createHireState, createHireDispatch] = useContext(
    CreateHireDataContext
  );
  const {
    collections: {
      bundle = [],
      category = [],
      customer = [],
      product = [],
      location = []
    }
  } = lookupDataState;
  const {
    groupSelected = "",
    productList = [],
    titlePage = "",
    step = 1,
    dataRequest = {},
    dataRequest: { locationId = -1 }
  } = createHireState;
  const { clientWeight = "0.0", hireLine = [] } = dataRequest;
  const permissionCheck = usePermission();
  // console.log("permissionCheck 1--------------", permissionCheck)
  const getProduct = useCallback(
    async (group, field, item) => {
      try {
        let param = {};
        param[field] = item[field];
        console.log(param);
        const result = await AxiosGet(`Product/GetProductsBy${group}Id`, param);

        if (result.data) {
          createHireDispatch(
            CREATE_HIRE_ACTIONS.changeField("productList", result.data)
          );
        }
      } catch (e) {
        console.log("getProduct", e);
      }
    },
    [createHireDispatch]
  );

  useEffect(() => {
    if (!_.isEmpty(permissionCheck.permissionArray) && !_.isEmpty(profile)) {
      const { locationId: locationFetch = 0 } = profile;

      // !ONLY CLINICIAN NEED SET LOCATION ID IN DATA REQUEST TO SEND
      if (permissionCheck.isClinician() && locationFetch > 0) {
        createHireDispatch(
          CREATE_HIRE_ACTIONS.saveDataRequest({ locationId: locationFetch })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, permissionCheck]);

  useEffect(() => {
    // !ONLY CLINICIAN NEED SET CUSTOMER ID IN DATA REQUEST TO SEND
    if (
      permissionCheck &&
      permissionCheck.isClinician() &&
      !_.isEmpty(location) &&
      locationId > 0
    ) {
      let temp = _.find(location, { locationId }) || {};
      console.log("location id found------------", temp);
      const { customerId = 0 } = temp;
      createHireDispatch(CREATE_HIRE_ACTIONS.saveDataRequest({ customerId }));
    }
  }, [createHireDispatch, location, locationId, permissionCheck]);

  useEffect(() => {
    const getCustomer = async () => {
      let result = await getData("Customer");
      lookupDataDispatch(
        LOOKUP_DATA_ACTIONS.updateCollections({ customer: result })
      );
    };

    if (permissionCheck && permissionCheck.isTechnician()) {
      getCustomer();
    }
  }, [permissionCheck, lookupDataDispatch, getData]);

  const promiseOptions = useCallback(
    (inputValue, model) =>
      // TODO: improve code to API get
      new Promise(resolve => {
        setTimeout(async () => {
          let result = await getData(model);

          const filtered = _.filter(result, i =>
            i.name.toLowerCase().includes(inputValue.toLowerCase())
          );
          resolve(filtered);
        }, 500);
      }),
    [getData]
  );

  const renderListLabelGroupByType = (type, label, group, field) => (
    <ListLabelGroup
      labelGroup={label}
      showEmpty={false}
      classNameOfLabel={"p-base"}
      listItem={
        _.isEmpty(type)
          ? []
          : type.map(t => {
              const { name = "", image = "", description = "" } = t;
              return {
                className: _.isEqual(t, groupSelected) ? "active" : "",
                name,
                description,
                image: image || "",
                icon: (
                  <FontAwesomeIcon
                    icon={"chevron-right"}
                    className={"icon color-dusk-blue"}
                  />
                ),
                action: () => {
                  // ! Will process for API get product when select group
                  createHireDispatch(
                    CREATE_HIRE_ACTIONS.selectGroup(
                      t,
                      [].concat(
                        ...product.map(p => ({ ...p, qty: 1, size: "" })) // !turn off for dev
                      )
                    )
                  );
                  getProduct(group, field, t);
                }
              };
            })
      }
    />
  );
  const handlePrevious = step => {
    switch (step) {
      case 1: {
        createHireDispatch(
          CREATE_HIRE_ACTIONS.changeField("groupSelected", "")
        );
        break;
      }
      case 2: {
        createHireDispatch(CREATE_HIRE_ACTIONS.changeField("step", step - 1));
        createHireDispatch(
          CREATE_HIRE_ACTIONS.changeField("groupSelected", "")
        );
        createHireDispatch(
          CREATE_HIRE_ACTIONS.changeField("titlePage", "Product selection")
        );
        break;
      }
      case 3: {
        createHireDispatch(CREATE_HIRE_ACTIONS.changeField("step", step - 1));
        createHireDispatch(
          CREATE_HIRE_ACTIONS.changeField("titlePage", "Selected products")
        );
        break;
      }
      case 4: {
        createHireDispatch(CREATE_HIRE_ACTIONS.changeField("step", step - 1));
        createHireDispatch(
          CREATE_HIRE_ACTIONS.changeField("titlePage", "Hire details")
        );
        break;
      }
      default: {
        break;
      }
    }
  };
  const switchStep = step => {
    switch (step) {
      case 1:
        return (
          <div className={"step-1"}>
            <div className={"menu-left"}>
              {_.isEmpty(groupSelected) ? (
                <SearchBox
                  theme={"grey"}
                  placeHolder={"Search for a product"}
                  onChange={() => {}}
                />
              ) : (
                <div
                  className={"previous cursor-pointer"}
                  onClick={() => {
                    handlePrevious(step);
                  }}
                >
                  <FontAwesomeIcon icon={"chevron-left"} className={"icon"} />
                  Previous
                </div>
              )}
              <div
                className={ClassNames("list-group-wrapper", {
                  "d-none d-sm-block": !_.isEmpty(groupSelected)
                })}
              >
                {renderListLabelGroupByType(
                  bundle,
                  "Bundles",
                  "Bundle",
                  "bundleId"
                )}
                {renderListLabelGroupByType(
                  category,
                  "Categories",
                  "Category",
                  "categoryId"
                )}
                <div
                  className={"cant-find p-base cursor-pointer"}
                  onClick={() => history.push(routeLinks.productRequest)}
                >
                  <div className={"d-flex align-items-center btn"}>
                    <img
                      alt={"can't_find"}
                      className={"icon"}
                      src={CantFindIcon}
                    />
                    <div className={"text text-left flex-grow-1"}>
                      Cant find what you’re looking for?
                    </div>
                    <FontAwesomeIcon
                      icon={"arrow-right"}
                      className={"ml-auto"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={"content-right"}>
              {_.isEmpty(groupSelected) ? null : (
                <div className={"product-group-selected"}>
                  <Formik
                    initialValues={{
                      hireLine: [],
                      productSelectedBaseId: [],
                      productList,
                      groupSelected
                    }}
                    enableReinitialize={true}
                    validateOnChange={true} // !!!DO NOT CHANGE
                    validateOnBlur={true}
                    validationSchema={validateStepOne}
                    onSubmit={values => {
                      const { hireLine: hireLineState = [] } = values;
                      console.log("Values step 1:", values);
                      showSuccessAddProduct();
                      createHireDispatch({
                        type:
                          CREATE_HIRE_DATA_ACTION_TYPES.CREATE_HIRE_DATA_SELECT_PRODUCT
                      });

                      createHireDispatch(
                        CREATE_HIRE_ACTIONS.saveDataRequest({
                          hireLine: [...hireLine, ...hireLineState].map(h => {
                            const {
                              productId = "",
                              selectedSize = "",
                              name = "",
                              image = "",
                              sizeRequirementId = 1,
                              requiresWeight = false
                            } = h;
                            return {
                              productId,
                              selectedSize,
                              name,
                              image,
                              sizeRequirementId,
                              requiresWeight
                            };
                          })
                        })
                      );
                    }}
                    render={({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      setFieldValue
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        {errors.hireLine && (
                          <div
                            className={"error-product padding-lr-responsive"}
                          >
                            <div className={"error-block"}>
                              {errors.hireLine}
                            </div>
                          </div>
                        )}
                        <FieldArray
                          name={"productSelectedBaseId"}
                          render={arrayHelpers => {
                            return (
                              <ListLabelGroup
                                classNameOfLabel={"intro-paragraph"}
                                theme={"white"}
                                loading={lookupDataState.loading}
                                labelGroup={groupSelected && groupSelected.name}
                                listItem={values.productList.map(p => {
                                  const {
                                    name = "",
                                    productId = "",
                                    image = ""
                                  } = p;

                                  let idx = values.productSelectedBaseId.findIndex(
                                    va => va === productId
                                  );
                                  return {
                                    ...p,
                                    image: image || "",
                                    id: productId,
                                    isLearnMore: true,
                                    isSelected: idx >= 0,
                                    name,
                                    icon: (
                                      <Checkbox
                                        name={"test"}
                                        error={errors.hireLine}
                                        touched={_.isArray(
                                          touched.productSelectedBaseId
                                        )}
                                        checked={idx >= 0}
                                      />
                                    ),
                                    action: (e, index, item) => {
                                      const { productId = "" } = item;
                                      let array = [...values.hireLine];

                                      if (idx < 0) {
                                        arrayHelpers.push(productId);
                                        array.push(item);
                                        setFieldValue("hireLine", array);
                                      } else {
                                        arrayHelpers.remove(idx);
                                        array.splice(idx, 1);
                                        setFieldValue("hireLine", array);
                                      }
                                    }
                                  };
                                })}
                              />
                            );
                          }}
                        />

                        <div
                          className={
                            "submit-block one-button padding-lr-responsive"
                          }
                        >
                          <BaseButton
                            className={"text-link-white btn-add-product"}
                            variant={"main"}
                            content={"Add products to hire"}
                            type={"submit"}
                          />
                        </div>
                      </form>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 2: //STEP SHOW CART, WILL UPDATE SIZE PRODUCT
        return (
          <Formik
            initialValues={{
              clientWeight,
              isVisibleWeight:
                hireLine.filter(pr => pr.requiresWeight === true).length > 0,
              hireLine: hireLine.map(pr => {
                return {
                  ...pr,
                  productId: pr.productId,
                  name: pr.name,
                  selectedSize: pr.selectedSize,
                  sizeRequirementId: pr.sizeRequirementId
                };
              })
            }}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={validateStepTwo}
            onSubmit={values => {
              const { hireLine = [] } = values;
              console.log("Values step 2:", values);
              createHireDispatch(
                CREATE_HIRE_ACTIONS.updateProductSelected(hireLine)
              );
              createHireDispatch(CREATE_HIRE_ACTIONS.changeField("step", 3));
              createHireDispatch(
                CREATE_HIRE_ACTIONS.changeField("titlePage", "Hire details")
              );
              createHireDispatch(CREATE_HIRE_ACTIONS.saveDataRequest(values));
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched
              /* and other goodies */
            }) => (
              <div
                className={ClassNames(
                  "step-2 padding-tb-responsive",
                  !values.isVisibleWeight && "pt-0"
                )}
              >
                <form onSubmit={handleSubmit}>
                  <div className={"patient-weight-wrapper"}>
                    <div
                      className={"upper-content"}
                      hidden={!values.isVisibleWeight}
                    >
                      <div className={"label paragraph-heading-charcoal"}>
                        Patient weight
                      </div>
                      <div className={"description input-help-text"}>
                        Some of the selected products have variations to best
                        suit the patients size.
                      </div>
                      <PatientWeight
                        unit={"kg"}
                        disabled={!values.isVisibleWeight}
                        type={"number"}
                        name={"clientWeight"}
                        value={values.clientWeight}
                        error={errors.clientWeight}
                        touched={touched.clientWeight}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div
                      className={"table-product d-table table table-responsive"}
                    >
                      <div className={"d-table-row bg-dusk-blue"}>
                        <div className={"d-table-cell product"}>Products</div>
                        <div className={"d-table-cell quantity"}>Remove</div>
                      </div>
                    </div>
                    {!_.isEmpty(values.hireLine) ? (
                      <FieldArray
                        name={"hireLine"}
                        render={() => {
                          return values.hireLine.map((product, index) => {
                            const { sizeRequirementId = 0 } = product;
                            return (
                              <div
                                key={index}
                                className={
                                  "product-item-with-size padding-lr-responsive p-t-16 p-b-16"
                                }
                              >
                                <ProductItemQty
                                  key={index}
                                  {...product}
                                  isSelected={true}
                                  className={ClassNames("d-flex", {
                                    "has-size": sizeRequirementId >= 2
                                  })}
                                  removeProduct={() => {
                                    let array = [...hireLine]; //clone array
                                    if (index > -1) {
                                      array.splice(index, 1);
                                    }
                                    createHireDispatch(
                                      CREATE_HIRE_ACTIONS.updateProductSelected(
                                        array
                                      )
                                    );
                                  }}
                                />

                                <SizeOption
                                  sizeRequirementId={sizeRequirementId}
                                  value={
                                    values &&
                                    values.hireLine &&
                                    values.hireLine[index] &&
                                    values.hireLine[index].selectedSize
                                  }
                                  name={`hireLine[${index}].selectedSize`}
                                  error={
                                    errors &&
                                    errors.hireLine &&
                                    errors.hireLine[index] &&
                                    errors.hireLine[index].selectedSize
                                  }
                                  touched={
                                    touched &&
                                    touched.hireLine &&
                                    touched.hireLine[index] &&
                                    touched.hireLine[index].selectedSize
                                  }
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  setFieldValue={setFieldValue}
                                  setFieldTouched={setFieldTouched}
                                />
                              </div>
                            );
                          });
                        }}
                      />
                    ) : (
                      <div
                        className={"empty-product intro-paragraph text-center"}
                      >
                        No products added.
                        <br />
                        Select more products to proceed.
                      </div>
                    )}
                  </div>
                  {/*<pre>Error: {JSON.stringify(errors, null, 2)}</pre>*/}
                  <div className={"submit-block p-t-16"}>
                    <BaseButton
                      className={
                        "text-link-white btn-add-product d-inline-block"
                      }
                      variant={"secondary"}
                      inline={true}
                      content={"More products"}
                      type={"button"}
                      onClick={() => {
                        handlePrevious(step);
                      }}
                    />
                    <BaseButton
                      className={
                        "text-link-white btn-add-product d-inline-block"
                      }
                      variant={"main"}
                      inline={true}
                      disabled={_.isEmpty(values.hireLine)}
                      content={"Enter details"}
                      type={"submit"}
                    />
                  </div>
                </form>
              </div>
            )}
          />
        );

      case 3: //FORM FOR CUSTOMER DETAIL
        let isVisibleWeight =
          hireLine.filter(pr => pr.requiresWeight === true).length > 0;
        return (
          <div className={"step-3"}>
            <div className={"menu-left"}>
              <div
                className={"previous cursor-pointer"}
                onClick={() => {
                  handlePrevious(step);
                }}
              >
                <FontAwesomeIcon icon={"chevron-left"} className={"icon"} />
                Previous
              </div>
              <div
                className={
                  "padding-tb-responsive padding-lr-responsive d-none d-sm-block"
                }
              >
                <div className={"top-section"}>
                  <div className={"h3-blue current-cart mb-16"}>
                    Current cart
                  </div>
                  <div hidden={!isVisibleWeight}>
                    <div className={"label paragraph-heading-charcoal mb-8"}>
                      Patient weight
                    </div>
                    <div className={"description input-help-text mb-8"}>
                      Some of the selected products have variations to best suit
                      the patients size.
                    </div>
                    <PatientWeight
                      readOnly={true}
                      unit={"kg"}
                      value={clientWeight}
                    />
                  </div>
                </div>
                <HiredProduct showTitle={false} products={hireLine} />
              </div>
            </div>
            <div
              className={
                "content-right padding-lr-responsive padding-tb-responsive"
              }
            >
              {permissionCheck &&
                renderFormForEachRole(permissionCheck.getRealPermission())}
            </div>
          </div>
        );

      case 4: //FINALIZE HIRE
        return (
          <div className={"step-4"}>
            <div className={"menu-left"}>
              <div
                className={"previous cursor-pointer"}
                onClick={() => {
                  handlePrevious(step);
                }}
              >
                <FontAwesomeIcon icon={"chevron-left"} className={"icon"} />
                Previous
              </div>
              {renderDataPreview(dataRequest)}

              <HiredProduct showTitle={true} products={hireLine} />
            </div>
            <div
              className={
                "content-right padding-lr-responsive padding-tb-responsive"
              }
            >
              <Formik
                initialValues={{
                  ...dataRequest,
                  comments: "",
                  signature: ""
                }}
                enableReinitialize={true}
                validateOnChange={true} // !!!DO NOT CHANGE
                validateOnBlur={true}
                validationSchema={validateStepFourPermobil}
                onSubmit={values => {
                  console.log("Values step 4:", values);
                  createHireDispatch(
                    CREATE_HIRE_ACTIONS.saveDataRequest(values)
                  );
                  console.log(
                    "VALUES REQUESTED PERMOBIL-----------",
                    dataRequest
                  );
                  const {
                    clientWeight = "",
                    streetAddress = "",
                    city = "",
                    suburb = "",
                    postCode = "",
                    signature
                  } = {
                    ...dataRequest,
                    ...values
                  };
                  const { comments = "" } = values;
                  AxiosPost("Hire", {
                    ...dataRequest,
                    ...values,
                    clientWeight: parseInt(clientWeight),
                    hireExternal: [
                      {
                        signature,
                        streetAddress,
                        city,
                        suburb,
                        postCode
                      }
                    ],
                    hireNote: [{ note: comments }]
                  })
                    .then(() => {
                      createHireDispatch(
                        CREATE_HIRE_ACTIONS.clearCreateHireData()
                      );
                      history.push({
                        pathname: routeLinks.success,
                        state: {
                          heading: "Thank you for requesting a hire.",
                          sub:
                            "A Permobil rep will be dispatched to deliver the products. ",
                          menu: JSON.stringify([
                            {
                              label: "Continue to the main menu",
                              link: routeLinks.home
                            }
                          ])
                        }
                      });
                    })
                    .catch(error => {
                      console.log(error);
                    });
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
                    <TextBox
                      placeholder={""}
                      className={"d-none d-sm-block"}
                      label={"Comments"}
                      value={values.comments}
                      name={"comments"}
                      isTextarea={true}
                      error={errors.comments}
                      touched={touched.comments}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <div className={"signature"}>
                      <div className={"paragraph-heading-charcoal mb-common"}>
                        Privacy policy
                      </div>
                      <div className={"input-help-text mb-common"}>
                        You details are kept for the purpose of the hire. We do
                        not share your details with 3rd parties. View our{" "}
                        <u
                          className={"input-help-text-link cursor-pointer"}
                          onClick={() =>
                            openUrlInApp("https://privacy.permobil.com/")
                          }
                        >
                          Privacy policy.
                        </u>
                      </div>
                      <div className={"paragraph-heading-charcoal mb-common"}>
                        Your signature
                      </div>
                      <div className={"input-help-text mb-common"}>
                        By signing below, you agree to our{" "}
                        <u
                          className={"input-help-text-link cursor-pointer"}
                          onClick={() =>
                            openUrlInApp("http://permobilus.com/terms-of-use/")
                          }
                        >
                          Terms and Conditions.
                        </u>
                      </div>
                      <Signature
                        value={values.signature}
                        name={"signature"}
                        error={errors.signature}
                        touched={touched.signature}
                        onBlur={handleBlur}
                        onChange={base64String => {
                          setFieldValue("signature", base64String);
                        }}
                      />
                    </div>
                    <div className={"submit-block one-button"}>
                      <BaseButton
                        className={
                          "text-link-white btn-add-product d-inline-block"
                        }
                        variant={"main"}
                        inline={true}
                        content={"Confirm hire"}
                        type={"submit"}
                      />
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        );
      default:
        return <h2>Not found</h2>;
    }
  };

  const handleStepThreeSubmit = values => {
    console.log("Submit data step 3:", { ...values });
    createHireDispatch(CREATE_HIRE_ACTIONS.saveDataRequest(values));
    const { externalAddress = false, startDate } = values;
    const { dataRequest = {} } = createHireState;
    const {
      note = "",
      clientWeight = "",
      streetAddress = "",
      suburb = "",
      city = "",
      postCode = ""
    } = {
      ...dataRequest,
      ...values
    };

    const dataFormatToSend = {
      ...dataRequest,
      ...values,
      // starDate: startDate.toLocaleString("en-US", {timeZone: "Pacific/Auckland"}),
      startDate: momentTimeZone(startDate).format(),
      hireLine: hireLine.map(h => {
        const { productId = 0, selectedSize = "" } = h;
        return { productId, selectedSize };
      }),
      clientWeight: parseInt(clientWeight),
      hireNote: [{ note }]
    };

    //  !SHOW SUCCESS SCREEN, ONLY PERMOBIL NEED CONFIRM STEP 4
    if (permissionCheck.isPermobil()) {
      dataFormatToSend["hireExternal"] = [
        {
          streetAddress,
          suburb,
          city,
          postCode: postCode.toString(),
          agreeTerms: true
        }
      ];
      createHireDispatch(CREATE_HIRE_ACTIONS.changeField("step", 4));
      createHireDispatch(
        CREATE_HIRE_ACTIONS.changeField("titlePage", "Finalize hire")
      );
    } else {
      if (permissionCheck.isTechnician() && externalAddress) {
        dataFormatToSend["hireExternal"] = [
          {
            streetAddress,
            suburb,
            city,
            postCode: postCode.toString(),
            agreeTerms: true
          }
        ];
      }
      AxiosPost("Hire", dataFormatToSend)
        .then(result => {
          createHireDispatch(CREATE_HIRE_ACTIONS.clearCreateHireData());
          if (result.data) {
            history.push({
              pathname: routeLinks.success,
              state: {
                heading: "Thank you for requesting a hire.",
                sub:
                  "A Permobil rep will be dispatched to deliver the products.",
                menu: JSON.stringify([
                  {
                    label: "Continue to the main menu",
                    link: routeLinks.home
                  }
                ])
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const renderFormForEachRole = role => {
    switch (role) {
      case "clinician:all":
        return (
          <Formik
            initialValues={{
              clientName: "",
              nhi: "",
              startDate: "",
              requisitionOrder: "",
              note: "",
              ...dataRequest
            }}
            enableReinitialize={true}
            validateOnChange={true} // !!!DO NOT CHANGE
            validateOnBlur={true}
            validationSchema={validateStepThreeClinician}
            onSubmit={values => {
              handleStepThreeSubmit(values);
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
                <TextBox
                  placeholder={""}
                  label={"Client name"}
                  value={values.clientName}
                  name={"clientName"}
                  error={errors.clientName}
                  touched={touched.clientName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"NHI (optional)"}
                  value={values.nhi}
                  name={"nhi"}
                  maxLength={7}
                  error={errors.nhi}
                  touched={touched.nhi}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"Requisition/PO # (if available)"}
                  value={values.requisitionOrder}
                  name={"requisitionOrder"}
                  maxLength={10}
                  error={errors.requisitionOrder}
                  touched={touched.requisitionOrder}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Datepicker
                  label={"Rental start date"}
                  placeholderText={""}
                  name={"startDate"}
                  error={errors.startDate}
                  touched={touched.startDate}
                  selected={values.startDate}
                  minDate={momentTimeZone().toDate()}
                  dateFormat={"dd/MM/yyyy"}
                  showMonthDropdown={true}
                  showYearDropdown={true}
                  onSelect={date => {
                    console.log(date);
                    setFieldValue("startDate", date);
                  }}
                />

                <TextBox
                  placeholder={""}
                  label={"Notes (optional)"}
                  value={values.note}
                  name={"note"}
                  isTextarea={true}
                  error={errors.note}
                  touched={touched.note}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className={"submit-block one-button"}>
                  <BaseButton
                    className={"text-link-white btn-add-product d-inline-block"}
                    variant={"main"}
                    inline={true}
                    content={"Send hire request"}
                    type={"submit"}
                  />
                </div>
              </form>
            )}
          />
        );

      case "hero:all":
        return (
          <Formik
            initialValues={{
              requisitionOrder: "",
              customerId: "",
              locationId: "",
              clientName: "",
              clientPhone: "",
              clientEmail: "",
              startDate: "",
              nhi: "",
              externalAddress: false,
              streetAddress: "",
              suburb: "",
              city: "",
              postCode: "",
              isPermissionClientInfo: false,
              ...dataRequest
            }}
            enableReinitialize={true}
            validateOnChange={true} // !!!DO NOT CHANGE
            validateOnBlur={true}
            validationSchema={validateStepThreeTechnician}
            onSubmit={values => {
              handleStepThreeSubmit(values);
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
                <TextBox
                  placeholder={""}
                  label={"Requisition/PO #"}
                  value={values.requisitionOrder}
                  name={"requisitionOrder"}
                  maxLength={10}
                  error={errors.requisitionOrder}
                  touched={touched.requisitionOrder}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Selection
                  placeholder={"Select customer"}
                  showArrow={true}
                  label={"Customer"}
                  name={"customerId"}
                  options={customer}
                  // value={
                  //   _.find(customer, { customerId: values.customerId }) || {}
                  // }
                  error={errors.customerId}
                  touched={touched.customerId}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.customerId}
                  isClearable={true}
                  // loadOptions={text => promiseOptions(text, "Customer")}
                  onBlur={handleBlur}
                  onChange={option => {
                    if (option) {
                      setFieldValue("customerId", option.customerId);
                      console.log(
                        "find customerId--------------",
                        _.find(customer, { customerId: option.customerId }) ||
                          {}
                      );
                    } else {
                      setFieldValue("customerId", "");
                    }
                  }}
                />

                <Selection
                  label={"Location"}
                  name={"locationId"}
                  placeholder={"Select location"}
                  // value={
                  //   _.find(location, { locationId: values.locationId }) || {}
                  // }
                  options={location}
                  error={errors.locationId}
                  touched={touched.locationId}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.locationId}
                  isClearable={true}
                  loadOptions={text => promiseOptions(text, "Location")}
                  onChange={option => {
                    console.log(option);
                    if (option) {
                      setFieldValue("locationId", option.locationId);
                      console.log(
                        "find locationId--------------",
                        _.find(location, { locationId: option.locationId }) ||
                          {}
                      );
                    } else {
                      setFieldValue("locationId", "");
                    }
                  }}
                />

                <TextBox
                  placeholder={""}
                  label={"Bed number (optional)"}
                  value={values.bedNumber}
                  name={"bedNumber"}
                  maxLength={20}
                  error={errors.bedNumber}
                  touched={touched.bedNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Datepicker
                  label={"Rental start date"}
                  placeholderText={""}
                  name={"expiredAt"}
                  error={errors.startDate}
                  touched={touched.startDate}
                  selected={values.startDate}
                  minDate={momentTimeZone().toDate()}
                  dateFormat={"dd/MM/yyyy"}
                  showMonthDropdown={true}
                  showYearDropdown={true}
                  onSelect={date => {
                    setFieldValue("startDate", date);
                  }}
                />

                <TextBox
                  placeholder={""}
                  label={"NHI (optional)"}
                  value={values.nhi}
                  name={"nhi"}
                  maxLength={7}
                  error={errors.nhi}
                  touched={touched.nhi}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"Client name"}
                  value={values.clientName}
                  name={"clientName"}
                  maxLength={100}
                  error={errors.clientName}
                  touched={touched.clientName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"ACC claim number (optional)"}
                  maxLength={10}
                  value={values.accClaimNumber}
                  name={"accClaimNumber"}
                  error={errors.accClaimNumber}
                  touched={touched.accClaimNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <RadioList
                  label={"Private hire?"}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false }
                  ]}
                  name={"externalAddress"}
                  value={values.externalAddress}
                  touched={touched.externalAddress}
                  onBlur={handleBlur}
                  onSelect={value => {
                    setFieldValue("externalAddress", JSON.parse(value));
                  }}
                />

                <TextBox
                  placeholder={""}
                  label={`Client phone (${
                    !values.externalAddress ? "optional" : "if available"
                  })`}
                  maxLength={20}
                  value={values.clientPhone}
                  name={"clientPhone"}
                  type={"tel"}
                  error={errors.clientPhone || errors.atLeastOneOf}
                  touched={
                    touched.clientPhone || !_.isEmpty(errors.atLeastOneOf)
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={`Client email (${
                    !values.externalAddress ? "optional" : "if available"
                  })`}
                  type={"email"}
                  value={values.clientEmail}
                  name={"clientEmail"}
                  maxLength={255}
                  error={errors.clientEmail || errors.atLeastOneOf}
                  touched={
                    touched.clientEmail || !_.isEmpty(errors.atLeastOneOf)
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                {values.externalAddress > 0 && (
                  <div className={"external-block"}>
                    <div className={"external-head"}>Client address</div>
                    <TextBox
                      placeholder={""}
                      label={"Street address"}
                      value={values.streetAddress}
                      maxLength={100}
                      name={"streetAddress"}
                      error={errors.streetAddress}
                      touched={touched.streetAddress}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <TextBox
                      placeholder={""}
                      label={"Suburb"}
                      maxLength={50}
                      value={values.suburb}
                      name={"suburb"}
                      error={errors.suburb}
                      touched={touched.suburb}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <TextBox
                      placeholder={""}
                      label={"City"}
                      value={values.city}
                      name={"city"}
                      maxLength={50}
                      error={errors.city}
                      touched={touched.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <TextBox
                      placeholder={""}
                      type={"number"}
                      label={"Post code"}
                      value={values.postCode}
                      name={"postCode"}
                      maxLength={4}
                      error={errors.postCode}
                      touched={touched.postCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <TextBox
                  placeholder={""}
                  label={"Notes (optional)"}
                  value={values.note}
                  name={"note"}
                  isTextarea={true}
                  error={errors.note}
                  touched={touched.note}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Checkbox
                  name={"isPermissionClientInfo"}
                  label={
                    "I have permission to provide personal information on behalf of the client"
                  }
                  className={"mb-16"}
                  showError={true}
                  error={errors.isPermissionClientInfo}
                  touched={touched.isPermissionClientInfo}
                  checked={values.isPermissionClientInfo}
                  value={values.isPermissionClientInfo}
                  onChange={value =>
                    setFieldValue("isPermissionClientInfo", value)
                  }
                />
                <div className={"submit-block one-button"}>
                  <BaseButton
                    className={"text-link-white btn-add-product d-inline-block"}
                    variant={"main"}
                    inline={true}
                    content={"Send hire request"}
                    type={"submit"}
                  />
                </div>
              </form>
            )}
          />
        );

      case "permobil_external:all":
        return (
          <Formik
            initialValues={{
              clientName: "",
              clientPhone: "",
              clientEmail: "",
              startDate: "",
              nhi: "",
              streetAddress: "",
              suburb: "",
              city: "",
              postCode: "",
              ...dataRequest
            }}
            enableReinitialize={true}
            validateOnChange={true} // !!!DO NOT CHANGE
            validateOnBlur={true}
            validationSchema={validateStepThreePermobil}
            onSubmit={values => {
              handleStepThreeSubmit(values);
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
                <TextBox
                  placeholder={""}
                  label={"Name"}
                  value={values.clientName}
                  name={"clientName"}
                  maxLength={100}
                  error={errors.clientName}
                  touched={touched.clientName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"Phone"}
                  maxLength={20}
                  value={values.clientPhone}
                  name={"clientPhone"}
                  type={"tel"}
                  error={errors.clientPhone}
                  touched={touched.clientPhone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"Email"}
                  type={"email"}
                  value={values.clientEmail}
                  name={"clientEmail"}
                  maxLength={255}
                  error={errors.clientEmail}
                  touched={touched.clientEmail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Datepicker
                  label={"Rental start date"}
                  placeholderText={""}
                  name={"expiredAt"}
                  error={errors.startDate}
                  touched={touched.startDate}
                  selected={values.startDate}
                  minDate={momentTimeZone().toDate()}
                  dateFormat={"dd/MM/yyyy"}
                  showMonthDropdown={true}
                  showYearDropdown={true}
                  onSelect={date => {
                    setFieldValue("startDate", date);
                  }}
                />

                <TextBox
                  placeholder={""}
                  label={"NHI (optional)"}
                  value={values.nhi}
                  name={"nhi"}
                  maxLength={7}
                  error={errors.nhi}
                  touched={touched.nhi}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <TextBox
                  placeholder={""}
                  label={"ACC claim number (optional)"}
                  maxLength={10}
                  value={values.accClaimNumber}
                  name={"accClaimNumber"}
                  error={errors.accClaimNumber}
                  touched={touched.accClaimNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <div className={"external-block"}>
                  <div className={"external-head"}>External hire address</div>
                  <TextBox
                    placeholder={""}
                    label={"Street address"}
                    value={values.streetAddress}
                    name={"streetAddress"}
                    maxLength={100}
                    error={errors.streetAddress}
                    touched={touched.streetAddress}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextBox
                    placeholder={""}
                    label={"Suburb"}
                    value={values.suburb}
                    name={"suburb"}
                    maxLength={50}
                    error={errors.suburb}
                    touched={touched.suburb}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextBox
                    placeholder={""}
                    label={"City"}
                    value={values.city}
                    name={"city"}
                    maxLength={50}
                    error={errors.city}
                    touched={touched.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextBox
                    placeholder={""}
                    type={"number"}
                    label={"Post code"}
                    value={values.postCode}
                    name={"postCode"}
                    classNameInput={"w-50"}
                    maxLength={4}
                    error={errors.postCode}
                    touched={touched.postCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <TextBox
                  placeholder={""}
                  label={"Notes (optional)"}
                  value={values.note}
                  name={"note"}
                  isTextarea={true}
                  error={errors.note}
                  touched={touched.note}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <div className={"submit-block one-button"}>
                  <BaseButton
                    className={"text-link-white btn-add-product d-inline-block"}
                    variant={"main"}
                    inline={true}
                    content={"Confirm details"}
                    type={"submit"}
                  />
                </div>
              </form>
            )}
          />
        );

      default:
        return <div>Invalid role</div>;
    }
  };

  const renderDataPreview = () => {
    const {
      clientName = "",
      clientPhone = "",
      clientEmail = "",
      startDate,
      nhi = "",
      accClaimNumber = "",
      hireExternal = []
    } = dataRequest;
    const {
      streetAddress = "",
      city = "",
      suburb = "",
      postCode = ""
    } = hireExternal;
    return (
      <div className={"data-preview"}>
        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>Name:</div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {clientName || "N/A"}
          </div>
        </div>
        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>Phone:</div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {clientPhone || "N/A"}
          </div>
        </div>
        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>Email:</div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {clientEmail || "N/A"}
          </div>
        </div>
        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>
            Rental start date:
          </div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {momentTimeZone(startDate).format("DD/MM/YYYY") || "N/A"}
          </div>
        </div>
        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>NHI:</div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {nhi || "N/A"}
          </div>
        </div>
        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>
            ACC claim number:
          </div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {accClaimNumber || "N/A"}
          </div>
        </div>

        <div className={"data-item row m-0"}>
          <div className={"col-sm-6 p-0 input-label-blue"}>
            External hire address:
          </div>
          <div className={"col-sm-6 p-0 p-base text-sm-right"}>
            {_.isEmpty(hireExternal)
              ? "N/A"
              : [streetAddress, city, suburb, postCode].join(", ")}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={"create-hire-wrapper"}>
      <TemplateDetail
        textReturn={"Cancel"}
        iconReturn={<FontAwesomeIcon icon={"times"} className={"icon"} />}
        titlePage={titlePage}
        hideBurger={true}
        actionReturn={() => {
          setShowCancel(true);
        }}
      >
        <div className={"create-hire-content"}>
          {hireLine.length > 0 && step < 2 && (
            <div
              className={"btn p-0 shopping-cart-wrapper"}
              onClick={() => {
                createHireDispatch(CREATE_HIRE_ACTIONS.changeField("step", 2));
                createHireDispatch(
                  CREATE_HIRE_ACTIONS.changeField(
                    "titlePage",
                    "Selected products"
                  )
                );
              }}
            >
              <FontAwesomeIcon
                icon={"shopping-cart"}
                className={"icon color-white"}
              />
              <Badge className={"bg-ugly-yellow"}>{hireLine.length}</Badge>
            </div>
          )}
          {switchStep(step)}
          <ModalWarning
            title={"Cancel hire request?"}
            body={"You will lose all progress if you continue."}
            cancelText={"Continue request"}
            acceptText={"Cancel request"}
            show={showCancel}
            accept={() => {
              history.replace(routeLinks.home);
            }}
            close={setShowCancel}
          />
        </div>
      </TemplateDetail>
    </div>
  );
};

export default CreateHire;
