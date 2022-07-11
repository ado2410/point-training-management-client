import { AxiosResponse } from "axios";
import request from "../../../utils/request";
import { postService, putService } from "../../../utils/service";

export const getStudentDataService = async (
    semesterId: number,
    classId: string | undefined
) => {
    let _class = "";
    if (classId) _class = `&class=${classId}`;
    return (
        await request.get(`/semester_students?semester=${semesterId}${_class}`)
    ).data;
};

export const getClassesService = async () =>
    (await request.get(`/classes`)).data;

export const syncPointService = (
    semesterId: number,
    success?: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error?: (data: any, reject: any) => void
) => {
    postService(
        `/semester_students/update?semester=${semesterId}`,
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