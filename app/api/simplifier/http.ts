import axios from "axios";

const http = axios.create({
  baseURL: "http://10.10.30.103:8081/api",
  headers: {
    cookie: "sys_token=9d1ff6e2b9264053a0d6bddc59eccee7",
  },
});

export default http;
