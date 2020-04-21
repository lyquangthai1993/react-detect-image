import { useCallback, useContext, useEffect, useState } from "react";
import { LookupDataContext } from "../store/LookupData/lookupDataContext";
import { AxiosGet } from "../utils/axios/axiosGet";
import * as LOOKUP_DATA_ACTION_TYPES from "../store/LookupData/lookupDataActionTypes";

const useRefreshLookupData = (
  dataArray = ["Category", "Warehouse", "Vehicle", "User", "Bundle"]
) => {
  const [, dispatch] = useContext(LookupDataContext);
  const [results, setResults] = useState([]);
  
  const getData = useCallback(async url => {
    const result = await AxiosGet(url);
    
    if (result.error === null) {
      return {
        data: result.data,
        error: ""
      };
    } else {
      return {
        data: [],
        error: result.error.message
      };
    }
  }, []);
  
  const refresh = useCallback(async () => {
    dispatch({
      type: LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_LOADINGS_STARED
    });
    
    let temp = await Promise.all(
      dataArray.map(data => {
        return getData(data, data.toUpperCase());
      })
    ).then(data => {
      let objectTemp = {};
      
      data.forEach((dataLoop, index) => {
        objectTemp[dataArray[index].replace(/^\w/, c => c.toLowerCase())] =
          dataLoop.data;
      });
      
      return objectTemp;
    });
    setResults(temp);
    
    dispatch({
      type: LOOKUP_DATA_ACTION_TYPES.LOOKUP_DATA_LOADING_FINISHED,
      payload: temp
    });
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  
  return results;
};

export default useRefreshLookupData;
