import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api/transactions",
  headers: { "Content-Type": "application/json" }
});
export default api;
