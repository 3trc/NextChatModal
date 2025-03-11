import axios from "axios";

const http = axios.create({
  baseURL: process.env.XSEA_URL,
  headers: {
    // cookie: "sys_token=f58dca2b8efa4c83b807ccb14fa0de9d",
    AccessKey: '8508f519a2544277a4f17862e5950dfb',
    AccessKeySecret: '6fe076d4dec0446784d03cd5e54a7d64',
  },
});

export default http;
