import _ from "lodash";

export const RoleApp = {
  clinician: "clinician:all",
  technician: "hero:all",
};
export default class Permission {
  constructor(permissions = []) {
    this.permissionArray = permissions;
  }
  
  isClinician() {
    return _.indexOf(this.permissionArray, RoleApp.clinician) >= 0 ? RoleApp.clinician : "";
  }
  
  isTechnician() {
    return _.indexOf(this.permissionArray, RoleApp.technician) >= 0 ? RoleApp.technician : "";
  }
  
  getRealPermission() {
    return this.isClinician() || this.isTechnician();
  }
}
