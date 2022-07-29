import request from "../../../utils/request";

export const getSemesterDashboardService = async (semesterId: number) => (await request.get(`/semesters/${semesterId}/dashboard`)).data;