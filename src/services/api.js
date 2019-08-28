import axios from "axios";

const api = axios.create({
  /*"http://localhost:3333/api"*/
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
