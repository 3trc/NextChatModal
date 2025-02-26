import axios from "axios";

const http = axios.create({
  baseURL: "http://10.10.30.103:8081/api",
  headers: {
    cookie: "sys_token=8df3da30323244bb8db788b437d50b3a",
  },
});

export default http;
