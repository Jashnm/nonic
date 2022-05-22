import Axios from "axios";
import useTokenStore from "../hooks/useAuthToken";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"; // process.env.NEXT_PUBLIC_BASE_URL -- Enable this, and add env var if not using Vercel;

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
