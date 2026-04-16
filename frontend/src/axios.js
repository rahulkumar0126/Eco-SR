import axios from "axios";
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const instance = axios.create({
  baseURL: BACKEND_API_URL,
});

export default instance;