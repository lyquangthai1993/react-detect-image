import * as Yup from "yup";
import _ from "lodash";
// ------------ Yup validation setting ----------------
Yup.addMethod(Yup.mixed, "atLeastOneOf", function(list) {
  return this.test(`isOneRequired`, "", function() {
    const { createError, parent, path } = this;
    let isEmptyOneField = list.some(f => {
      return !_.isEmpty(parent[f.field]);
    });
    let findName = _.find(list, i => i.field === path);

    return (
      isEmptyOneField ||
      createError({
        path,
        message: `${findName && findName.label} cannot be empty`,
      })
    );
  });
});

const clientName = Yup.string()
  .nullable()
  .required("Client name cannot be empty")
  /* eslint-disable-next-line */
  .matches(
    /^[a-zA-Z\-_ ]+$/i,
    "No numbers or special characters beyond a hyphen",
  );

const nhi = Yup.string()
  .nullable()
  .matches(
    /(?![oi])[a-z][a-z]{2}[0-9]{4}/i,
    "Three Alphabet characters to start but not I or O. Followed by 4 numbers",
  );

const requisitionOrder = Yup.string()
  .nullable()
  .required("Requisition/PO # cannot be empty")
  .min(7, "Requisition/PO # is minimum 7 characters");

const requisitionOrderClinician = Yup.string()
  .nullable()
  .min(7, "Requisition/PO # is minimum 7 characters");

export { clientName, requisitionOrder, requisitionOrderClinician, nhi };
