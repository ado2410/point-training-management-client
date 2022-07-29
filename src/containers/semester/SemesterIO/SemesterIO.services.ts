import { AxiosResponse } from "axios";
import request from "../../../utils/request";
import { postService } from "../../../utils/service";

export const saveSemesterDataService = async (semesterId: number | undefined) => await (await request.get(`/semesters/${semesterId}/save`)).data;

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