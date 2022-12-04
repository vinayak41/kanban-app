import axios from "axios";
// import { getSession } from "next-auth/react";
// import { BASE_URL } from "utils/api";
import { getToken } from "utils/helper";

const instance = axios.create({
  // baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
