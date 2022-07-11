import { AxiosResponse } from "axios";
import { postService } from "../../../utils/service";

export const loginService = (
    data: LoginField,
    success?: (data: Record<string, any>, res: AxiosResponse<any, any>) => void,
    error?: (data: any, reject: any) => void,
): void => postService("/login", data, success, error);
