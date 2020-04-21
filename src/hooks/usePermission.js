import _ from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/authContext";
import Permission from "../auth/permission";
import { AxiosGet } from "../utils/axios/axiosGet";
// Hook
const usePermission = () => {
  const authContext = useContext(AuthContext);
  const { authState = {} } = authContext;
  const [permissionCheck, setPermissionCheck] = useState(new Permission());
  const getData = useCallback(async url => {
    const result = await AxiosGet(url);

    if (result.error === null) {
      return result.data;
    } else {
      return [];
    }
  }, []);
  const getUserInfo = useCallback(async profile => {
    let user = await getData("User/GetLoggedInUser");
    authContext.handleUserAddProfile({ ...profile, ...user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const { profile = {} } = authState;

    if (profile && _.isEmpty(permissionCheck.permissionArray)) {
      const { permissions = [] } = profile;
      setPermissionCheck(new Permission(permissions));
      if (!_.isEmpty(permissions)) {
        getUserInfo(profile);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return permissionCheck;
};

export default usePermission;
