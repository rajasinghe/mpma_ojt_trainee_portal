import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4001", //10.70.4.34
  headers: {
    Accept: "application/json",
  },
});

export default instance;
