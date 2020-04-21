import { useContext, useEffect } from "react";
import { CoreDataContext } from "../store/CoreData/coreDataContext";
import { AxiosGet } from "../utils/axios/axiosGet";
import * as CORE_DATA_ACTION_TYPES from "../store/CoreData/coreDataActionTypes";

const useRefreshCoreData = () => {
  const [, dispatch] = useContext(CoreDataContext);
  
  useEffect(() => {
  }, []);

  return null;
};

export default useRefreshCoreData;
