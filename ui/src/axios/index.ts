import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
