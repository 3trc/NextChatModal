import axios from "axios";

const http = axios.create({
  baseURL: "http://10.10.30.103:8081/api",
  headers: {
    cookie: "sys_token=d06370ee777f44a3889c81ab4c4321a8",
  },
});

export default http;
