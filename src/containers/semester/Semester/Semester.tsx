import Index from "../../../templates/Index";
import { useSearchParams } from "react-router-dom";
import { semesterCopyFormFields, semesterFormFields, semesterRoutes, semesterTableColumns } from "./Semester.constants";
import { semesterCanModify } from "./Semester.actions";
import { useSelector } from "react-redux";

function Major() {
    const auth = useSelector<StoreState, AuthState>(state => state.auth);
    const [searchParams] = useSearchParams();
    const yearId = searchParams.get("year") || undefined;

    return (
        <Index
            route="/semesters"
            params={{ year: yearId }}
            name="Học kỳ"
            routes={semesterRoutes}
            columns={semesterTableColumns(auth)}
            createFields={semesterFormFields}
            editFields={semesterFormFields}
            copyFields={semesterCopyFormFields(yearId)}
            canCreate={semesterCanModify(auth)}
            canEdit={semesterCanModify(auth)}
            canDelete={semesterCanModify(auth)}
        />
    );
}

export default Major;
