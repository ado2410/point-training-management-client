import request from "../../../utils/request";

export const getUserService = async (userId: number | undefined) => await (await request.get(`/users/${userId}`)).data;
export const getStudentService = async (studentId: number | undefined) => await (await request.get(`/students/${studentId}`)).data;
export const getSemesterStudentsService = async (studentId: number | undefined) => await (await request.get(`/semester_students/student/${studentId}`)).data;
export const getSemesterActivitiesService = async () => await (await request.get("/activities/user")).data;