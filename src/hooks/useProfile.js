import _ from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/authContext";
import { AxiosGet } from "../utils/axios/axiosGet";

const useProfile = () => {
  const [currentProfile, setCurrentProfile] = useState({});
  const { authState = {} } = useContext(AuthContext);
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
    setCurrentProfile({ ...profile, ...user });
  }, []);
  useEffect(() => {
    console.log("useProfile authState", authState);
    const { profile = {} } = authState;

    if (profile) {
      const { permissions = [] } = profile;
      if (!_.isEmpty(permissions)) {
        getUserInfo(profile);
      }
    }
  }, [authState]);

  return currentProfile;
};

export default useProfile;
