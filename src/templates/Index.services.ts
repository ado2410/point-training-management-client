import { AxiosResponse } from "axios";
import request from "../utils/request";

export const getDataService = async (
    route: string,
    params: Record<string, any>,
    search: string | undefined
) => {
    const searchParam = search ? `&search=${search}` : "";
    //Xoá các null query param
    Object.keys(params || []).forEach(
        (k) => params[k] == null && delete params[k]
    );
    return (
        await request.get(
            `${route}?${new URLSearchParams(params).toString()}${searchParam}`
        )
    ).data;
};

export const getOptionsService = async (route: string) => {
    return (await request.get(`${route}/create`)).data;
};

export const insertService = (
    route: string,
    data: Record<string, any>,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.post(route, data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};

export const updateService = (
    route: string,
    id: number,
    data: Record<string, any>,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.put(`${route}/${id}`, data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};

export const deleteService = (
    route: string,
    id: number,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.delete(`${route}/${id}`)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};

export const importService = (
    route: string,
    dataSet: Record<string, any>[],
    success: (data: Record<string, any>[], res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.post(`${route}/import`, dataSet)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};

export const copyService = (
    route: string,
    id: number,
    data: Record<string, any>[],
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void = () => {},
    error: (data: any, reject: any) => void = () => {},
    response: () => void = () => {},
) => {
    request.post(`${route}/${id}/copy`, data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject))
        .finally(response);
};