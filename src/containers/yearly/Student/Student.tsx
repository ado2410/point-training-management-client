import Index from "../../../templates/Index";
import {useSearchParams} from "react-router-dom";
import { studentCreateFormFields, studentEditFormFields, studentImportColumns, studentRoutes, studentTableColumns } from "./Student.constants";

function Class() {
    const [searchParams] = useSearchParams();
    const classId = searchParams.get("class") || undefined;

    return (
        <Index
            route="/students"
            params={{class: searchParams.get("class")}}
            name="Sinh viên"
            routes={studentRoutes}
            columns={studentTableColumns}
            importColumns={studentImportColumns}
            createFields={studentCreateFormFields(classId)}
            editFields={studentEditFormFields(classId)}
        />
    );
}

export default Class;