import Index from "../../../templates/Index";
import { useSearchParams } from "react-router-dom";
import { semesterCopyFormFields, semesterFormFields, semesterRoutes, semesterTableColumns } from "./Semester.constants";

function Major() {
    const [searchParams] = useSearchParams();
    const yearId = searchParams.get("year") || undefined;

    return (
        <Index
            route="/semesters"
            params={{ year: yearId }}
            name="Học kỳ"
            routes={semesterRoutes}
            columns={semesterTableColumns}
            createFields={semesterFormFields}
            editFields={semesterFormFields}
            copyFields={semesterCopyFormFields(yearId)}
        />
    );
}

export default Major;
