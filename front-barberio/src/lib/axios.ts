import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://137.131.135.29:1509", // URL base da sua API Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
