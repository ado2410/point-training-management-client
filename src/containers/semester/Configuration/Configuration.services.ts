import { AxiosResponse } from "axios";
import request from "../../../utils/request";

export const getConfigurationDataService = async (semesterId: number) => {
    return (await request.get(`/configurations?semester=${semesterId}`)).data;
};

export const getSemesterService = async (semesterId: number) => {
    return (await request.get(`/semesters/${semesterId}`)).data;
};

export const saveConfigurationService = async (
    data: ConfigurationSaveData,
    success: ((data: TitleActivity[], res: AxiosResponse<any, any>) => void),
    error: ((data: any, reject: any) => void)
) => {
    request.post('/configurations', data)
        .then((res) => success(res.data, res))
        .catch((reject) => error(reject.response.data, reject));
};
