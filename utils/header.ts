import { axiosInstance } from "@/api/axios";
import axios from "axios";

function setHeader(key: string, value: string) {
  axios.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  } else {
    delete axiosInstance.defaults.headers.common[key];
  }
}

export { removeHeader, setHeader };
