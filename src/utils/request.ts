import axios from "axios";
import { REDUX_LOCAL_STORAGE_NAME } from "../store/store.constants";

export const SERVER_URL: string = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : `http://${window.location.hostname}:3100`;

const axiosConfig = {
    baseURL: SERVER_URL,
    timeout: 20000,
};

const request = axios.create(axiosConfig);

//Tự động lấy access token từ local storage và gửi cho server
request.interceptors.request.use(
    (config) => {
        const storeStateJson = localStorage.getItem(REDUX_LOCAL_STORAGE_NAME);
        if (!storeStateJson) return config;
        const storeState = JSON.parse(storeStateJson) as StoreState;
        if (storeState.auth.accessToken)
            config.headers!.authorization = `Bearer ${storeState.auth.accessToken}`;
        return config;
    },
);

request.interceptors.response.use(
    (config) => config,
    (error) => {
        switch (error.response.data.key) {
            case "ACCESS-TOKEN-EXPIRED":
                break;
            default:
                return Promise.reject(error);
        }
    }
);

export default request;
