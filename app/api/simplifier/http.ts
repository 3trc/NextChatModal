import axios from "axios";

const http = axios.create({
  baseURL: process.env.XSEA_URL + '/api',
  headers: {
    cookie: process.env.XSEA_AUTH,
  },
});

export default http;
