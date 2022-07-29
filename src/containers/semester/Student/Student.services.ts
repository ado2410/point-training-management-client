import { AxiosResponse } from "axios";
import request from "../../../utils/request";
import { postService, putService } from "../../../utils/service";

export const getStudentDataService = async (
    semesterId: number,
    classId: string | undefined,
    keyword: string | undefined = undefined
) => {
    let params = "";
    if (classId) params = `&class=${classId}`;
    if (keyword) params += `&search=${keyword}`;
    return (
        await request.get(`/semester_students?semester=${semesterId}${params}`)
    ).data;
};

export const getSemesterService = async (semesterId: string | number | undefined) =>
    (await request.get(`/semesters/${semesterId}`)).data;

export const getClassesService = async () =>
    (await request.get(`/classes`)).data;

export const syncPointService = (
    semesterId: number,
    success?: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error?: (data: any, reject: any) => void
) => {
    postService(
        `/semester_students/sync?semester=${semesterId}`,
        undefined,
        success,
        error
    );
};

export const updateSemesterStudentService = (
    semesterStudentId: number | undefined,
    data: Record<string, any>,
    success?: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error?: (data: any, reject: any) => void
) => {
    putService(
        `/semester_students/${semesterStudentId}`,
        data,
        success,
        error
    );
};