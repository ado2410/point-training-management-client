import request from "../../../utils/request";

export const getSemestersService = async () => (await request.get("/semesters")).data;

export const getSemesterService = async (semesterId: number | undefined) => (await request.get(`/semesters/${semesterId}`)).data;