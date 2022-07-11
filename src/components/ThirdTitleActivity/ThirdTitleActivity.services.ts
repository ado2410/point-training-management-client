import request from "../../utils/request";

export const getActivitiesDataService = async (semesterId: number) => {
    return (await request.get(`/activities?semester=${semesterId}&type=all`)).data;
}