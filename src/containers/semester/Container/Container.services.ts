import request from "../../../utils/request";

export const getSemesterService = async (semesterId: number) => (await request.get(`/semesters/${semesterId}`)).data;