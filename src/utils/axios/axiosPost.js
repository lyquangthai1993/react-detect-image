import localForageApp from "localforage";
import axiosInstance from "./axiosConfig";

export const AxiosPost = async (
  url,
  data,
  params = {},
  customParameter = { showPopup: true }
) => {
  console.log("AxiosPost data", data);
  try {
    const accessToken = await localForageApp.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      params,
      customParameter
    };
    const response = await axiosInstance.post(url, data, config);
    
    return { data: response.data, error: null };
  } catch (err) {
    console.log(err);
    return Promise.reject({ data: null, error: err });
    // return { data: null, error: err };
  }
};
