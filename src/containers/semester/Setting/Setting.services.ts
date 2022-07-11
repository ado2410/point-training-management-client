import { AxiosResponse } from "axios";
import request from "../../../utils/request";
import { postService } from "../../../utils/service";

export const getSemesterDataService = async (semesterId: number) =>
    (await request.get(`/semesters/${semesterId}`)).data;

export const getOptionsService = async () =>
    (await request.get(`/semesters/create`)).data;

export const saveGeneralSettingService = (
    semesterId: number,
    data: Record<string, any>,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error: (data: any, reject: any) => void
) =>
    postService(
        `/semesters/${semesterId}/save_general_setting`,
        data,
        success,
        error
    );

export const importActivitiesService = (
    rows: Record<string, any>[],
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error: (data: any, reject: any) => void
) =>
    postService(
        "activities/import",
        rows,
        success,
        error
    );

export const loadSemesterDataService = (
    semesterId: number,
    data: any,
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error: (data: any, reject: any) => void
) =>
    postService(
        `semesters/${semesterId}/load`,
        data,
        success,
        error
    );