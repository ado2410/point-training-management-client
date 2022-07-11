import { AxiosResponse } from "axios";
import request from "../../../utils/request";

export const getConfigurationDataService = async (semesterId: number) => {
    return (await request.get(`/title_activities?semester=${semesterId}`)).data;
};

export const getSemesterService = async (semesterId: number) => {
    return (await request.get(`/semesters/${semesterId}`)).data;
};

export const saveConfigurationService = async (
    data: ConfigurationSaveData,
    success: ((data: TitleActivity[], res: AxiosResponse<any, any>) => void),
    error: ((data: any, reject: any) => void)
) => {
    request.post('/title_activities', data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject));
};
