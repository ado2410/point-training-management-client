import request from "../../../utils/request";

export const getGroupService = async (groupId: string | undefined) => {
    if (groupId === undefined) return undefined;
    else return (await request.get(`/groups/${groupId}`)).data
};