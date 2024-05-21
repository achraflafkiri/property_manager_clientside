import axios from "axios";

const api = axios.create({
  baseURL: "https://living-api-5spz.onrender.com/api/v1/",
});

export default api;
