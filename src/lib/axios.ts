import Axios from "axios";
import useTokenStore from "../hooks/useAuthToken";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;

const axios = Axios.create({
  baseURL: `${baseUrl}/api`
});

axios.interceptors.request.use(
  async function (config) {
    let { authToken } = useTokenStore.getState();

    if (authToken) config.headers!["authorization"] = `bearer ${authToken}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
