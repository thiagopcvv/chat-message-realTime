import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const strToken = await AsyncStorage.getItem("token");

    if (strToken) {
      config.headers["Authorization"] = `Bearer ${strToken}`;
      config.baseURL = `http://192.168.100.179:8087/api/`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
