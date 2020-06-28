import axios from "axios";
import { toast } from "react-toastify";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(
      (error && error.response && error.response.data && error.response.data.error) ||
        "An unexpected error has ocurred"
    );
    throw error;
  }
);

export const createAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};
