import axios from "axios";

const http = axios.create({
  baseURL: "http://10.10.30.103:8081/api",
  headers: {
    cookie: "sys_token=5eb97f2fdc9040e39e53232d10562cfb",
  },
});

export default http;
