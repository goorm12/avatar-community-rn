import axios from "axios";
import { Platform } from "react-native";

const baseUrls = {
  android: "http://192.168.0.54:3030",
  ios: "http://192.168.0.54:3030",
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

export { axiosInstance };
