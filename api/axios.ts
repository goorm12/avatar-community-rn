import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  android: "http://192.168.1.50:3030",
  ios: "http://192.168.1.50:3030",
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

export { axiosInstance };
