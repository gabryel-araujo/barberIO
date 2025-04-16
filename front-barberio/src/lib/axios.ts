import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1509", // URL base da sua API Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
