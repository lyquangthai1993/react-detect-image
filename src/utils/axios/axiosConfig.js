import axios from "axios";
import { TIMEOUT_REQUEST } from "../constants";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  }
);
axiosInstance.defaults.timeout = TIMEOUT_REQUEST;

export default axiosInstance;
