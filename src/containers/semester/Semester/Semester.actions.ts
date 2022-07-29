import { isAdmin } from "../../../store/slices/auth/auth.constants";

export const semesterCanModify = (auth: AuthState) => isAdmin(auth);