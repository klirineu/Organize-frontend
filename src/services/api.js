import axios from "axios";

const api = axios.create({
  /*process.env.REACT_APP_API_URL*/
  baseURL: "http://localhost:3333/api"
});

export default api;
