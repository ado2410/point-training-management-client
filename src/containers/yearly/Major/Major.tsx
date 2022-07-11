import Index from "../../../templates/Index";
import { useSearchParams } from "react-router-dom";
import { majorFormFields, majorRoutes, majorTableColumns } from "./Major.constants";

function Major() {
    const [searchParams] = useSearchParams();
    const departmentId = searchParams.get("department") || undefined;

    return (
        <Index
            route="/majors"
            params={{ department: departmentId }}
            name="Ngành học"
            routes={majorRoutes}
            columns={majorTableColumns}
            createFields={majorFormFields(departmentId)}
            editFields={majorFormFields(departmentId)}
        />
    );
}

export default Major;
