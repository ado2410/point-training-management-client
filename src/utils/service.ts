import { AxiosResponse } from "axios";
import request from "./request";

export const getService = (
    url: string,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.get(url)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};

export const postService = (
    url: string,
    data?: Record<string, any>,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.post(url, data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};

export const putService = (
    url: string,
    data?: Record<string, any>,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.put(url, data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};