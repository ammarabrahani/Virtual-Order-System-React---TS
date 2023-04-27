import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token && request.headers) {
    request.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //When Unauthorized
      localStorage.removeItem("access_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    throw new AxiosError(error.response);
  }
);

export default axiosInstance;
