import axios from "axios";

const nosSecuredAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxios = () => {
  return nosSecuredAxios;
};

export default useAxios;
