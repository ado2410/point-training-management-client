import request from "../../../utils/request";

export const getAttendanceService = async (classId: number | undefined = undefined) => {
    let _class = '';
    if (classId) _class = `?class=${classId}`;
    return (await request.get(`/attendance${_class}`)).data;
}

export const getActivityService = async (id: string | undefined) => (await request.get(`/activities/${id}`)).data;

export const getClassesService = async () => (await request.get(`/classes`)).data;

export const getActivitiesService = async (semesterId: number, activityTypeId: number) => (await request.get(`/activities?semester=${semesterId}&type=all&activity_type=${activityTypeId}`)).data;