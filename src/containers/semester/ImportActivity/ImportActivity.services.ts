import { AxiosResponse } from "axios";
import request from "../../../utils/request";
import { postService } from "../../../utils/service";

export const getOptionsService = async () =>
    (await request.get(`/activities/create`)).data;

export const importActivitiesService = (
    rows: Record<string, any>[],
    success: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error: (data: any, reject: any) => void
) =>
    postService(
        "activities/import",
        rows,
        success,
        error
    );