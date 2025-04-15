import axios from "axios";
import config from "../secret";
import { message } from "antd";

export const axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 300000,
    timeoutErrorMessage: 'Connection is timeout exceeded'
})

// let isTokenExpired = false;

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response ) => {
      if ((response.status === 200 || response.status === 201)&& response.data) {
        return response.data;
      }
      return response.data;
    },
    (error) => {
      console.log("axiosInstance: ", error.response.data)
      message.error(error.response.data?.message || error.response.data)
      if (error.response && error.response.status === 401) {
        return console.log("401 - Unauthorized")
      } else if (error.response && error.response.status === 403) {
        return console.log("403 - Forbidden")
      }
      else if (error.response && error.response.status === 404) {
        return console.log("404 - Not found")
      } else if (error.response && error.response.status === 500) {
        return console.log("500 - Internal server error")
      }
      return Promise.reject(error.response.data);
    }
  );
  
  
export default axiosInstance  