import { useEffect, useState } from "react";
import { AxiosGet } from "../utils/axios/axiosGet";

const useFeedbackData = () => {
  const [feedbackOptions, setFeedbackOptions] = useState([]);

  useEffect(() => {
    const getData = async url => {
      const result = await AxiosGet(url);
    
      if (result.error === null) {
        return result.data;
      } else {
        return [];
      }
    };
  
    const refresh = async () => {
      let result = await getData("FeedbackOption");
    
      setFeedbackOptions(result);
    };
  
    refresh();
  }, []);
  
  return feedbackOptions;
};

export default useFeedbackData;
