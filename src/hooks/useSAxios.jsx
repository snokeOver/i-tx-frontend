import axios from "axios";
import useLogOut from "./useLogOut";

const securedAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useSAxios = () => {
  const userLogOut = useLogOut();
  // This interceptor is used to add and send token authorization
  securedAxios.interceptors.request.use((config) => {
    const savedToken = localStorage.getItem("access-token");
    config.headers.authorization = `Bearer ${savedToken}`;
    return config;
  });

  // Interceptor for response at 401 and 402
  securedAxios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        console.log("Error in the interceptor:", error.response.status);
        return userLogOut();
      }

      return Promise.reject(error);
    }
  );
  return securedAxios;
};

export default useSAxios;
