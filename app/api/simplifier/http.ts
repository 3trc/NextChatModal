import axios from "axios";

const http = axios.create({
  baseURL: "http://192.168.8.139:8080/api",
  headers: {
    cookie: "sys_token=8df3da30323244bb8db788b437d50b3a",
  },
});

export default http;
