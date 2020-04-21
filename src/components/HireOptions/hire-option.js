import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import PatientIcon from "../../images/icon/patient.svg";
import NoteIcon from "../../images/icon/note.svg";
import RequestIcon from "../../images/icon/request.svg";
import ReportIcon from "../../images/icon/report.svg";
import AddIcon from "../../images/icon/add_product.svg";
import TransferIcon from "../../images/icon/transfer.svg";
import CustomerIcon from "../../images/icon/customer.svg";
import ShareIcon from "../../images/icon/share.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import { RoleApp } from "../../auth/permission";
import { isEmpty, isFunction } from "lodash";
import history from "../../utils/history";
import { routeLinks } from "../../app-routes";

const HireOption = props => {
  const {
    hireId = "",
    show = true,
    optionList,
    hireDetail,
    permissionCheck,
    toggle = () => {
    }
  } = props;
  return (
    <div className={"hire-option-wrapper bg-dark-blue"}>
      <h3 className={"h3-white-bold"}>Hire options</h3>
      {optionList
        .filter(view => {
          return (
            isEmpty(view.allow) ||
            view.allow.includes(
              permissionCheck && permissionCheck.getRealPermission()
            )
          );
        })
        .map(op => {
          const {
            iconPrepend = "",
            label = "",
            iconAppend = "",
            className = "",
            theme = "",
            action
          } = op;
          return (
            <div
              className={ClassNames(
                "btn border-0 rounded-0 text-left align-items-center option-item button-link-white",
                className || "d-flex",
                theme
              )}
              onClick={() => {
                if (isFunction(action)) {
                  toggle(!show);
                  action(hireId, hireDetail);
                }
              }}
            >
              <div className={"icon-prepend"}>
                <img alt={"request"} src={iconPrepend}/>
              </div>
              <div className={"flex-grow-1"}>{label}</div>
              <div className={"icon-append"}>{iconAppend}</div>
            </div>
          );
        })}
    </div>
  );
};

HireOption.propTypes = {
  hireId: PropTypes.string,
  hireDetail: PropTypes.object,
  optionList: PropTypes.array,
  show: PropTypes.bool
};

HireOption.defaultProps = {
  hireId: "",
  optionList: [
    {
      allow: [RoleApp.technician],
      theme: "grey",
      view: "patient",
      className: "d-none d-sm-flex",
      iconPrepend: PatientIcon,
      label: "View patient details",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.hireDetailClient.replace(":id", id),
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [RoleApp.clinician, RoleApp.technician],
      theme: "grey",
      view: "note",
      className: "d-none d-sm-flex",
      iconPrepend: NoteIcon,
      label: "View hire notes",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.hireDetailNote.replace(":id", id),
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [],
      iconPrepend: RequestIcon,
      label: "Request a pick up",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.pickupRequest,
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [],
      iconPrepend: ReportIcon,
      label: "Report a fault",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.faultReport,
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [],
      iconPrepend: AddIcon,
      label: "Add product to hire",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.productAdd.replace(":id", id),
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [],
      iconPrepend: TransferIcon,
      label: "Transfer hire",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.transferRequest,
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [],
      iconPrepend: CustomerIcon,
      label: "Customer Support",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.supportRequest,
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
    {
      allow: [],
      iconPrepend: ShareIcon,
      label: "Share your feedback",
      iconAppend: <FontAwesomeIcon icon={"arrow-right"}/>,
      action: (id, hireDetail) => {
        history.push({
          pathname: routeLinks.feedBack,
          state: {
            hireId: id,
            hireDetail
          },
        });
      },
    },
  ],
};

export default HireOption;
