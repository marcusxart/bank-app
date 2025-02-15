import Axios from "axios";
import { deleteCookie, getCookie } from "../utils/cookies";

const axios = Axios.create({
  baseURL: "http://localhost:4400",
});

axios.interceptors.request.use(
  async (config) => {
    let token = getCookie("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response?.status;

    if (statusCode === 401 || statusCode === 403) {
      const isAdminRoute = window.location.pathname.includes("admin");
      const redirectPath = isAdminRoute
        ? "/admin/auth/sign-in"
        : "/auth/sign-in";
      deleteCookie("access");

      window.history.pushState({}, "", redirectPath);
      window.dispatchEvent(new PopStateEvent("popstate"));

      if (error.config && error.config.url.includes("/auth")) {
        return Promise.reject(error);
      }
    }

    throw error;
  }
);

export default axios;
