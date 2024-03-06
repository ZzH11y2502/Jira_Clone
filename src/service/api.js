import axios from "axios";
import { DOMAIN, TOKEN, USER_INFO } from "./config";

const https = axios.create({
  baseURL: DOMAIN,
  headers: {
    TokenCybersoft: TOKEN,
  },
});

https.interceptors.request.use((req, error) => {
  req.headers = {
    ...req.headers,
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem(USER_INFO)).accessToken,
  };
  return req;
});

export const userID = JSON.parse(localStorage.getItem(USER_INFO))?.id;
export default https;
