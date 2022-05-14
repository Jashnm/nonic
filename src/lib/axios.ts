import Axios from "axios";
import useTokenStore from "../hooks/useAuthToken";

const axios = Axios.create({
  baseURL: "http://localhost:3000/api"
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
