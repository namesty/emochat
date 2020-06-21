import axios from "axios";
import { toast } from "react-toastify";

export const http = axios.create({
  baseURL: "http://192.168.1.40:5000/",
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
