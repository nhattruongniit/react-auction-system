import axios from "axios";

import authService from "./authServices";

const requestConfig = {
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3002",
  timeout: 5000,
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    // add x-auth-token
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const httpRequest = axiosInstance;

export default httpRequest;
