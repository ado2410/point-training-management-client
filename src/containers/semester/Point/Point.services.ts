import request from "../../../utils/request";

export const getPointDataService = async (semesterId: number, studentId: string | undefined) => (await request.get(`/semester_students/point?semester=${semesterId}&student=${studentId}`)).data;