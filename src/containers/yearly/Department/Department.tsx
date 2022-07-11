import Index from "../../../templates/Index";
import { departmentFormFields, departmentRoutes, departmentTableColumns } from "./Department.constants";

function Department() {
    return (
        <Index
            route="/departments"
            name="Khoa"
            routes={departmentRoutes}
            columns={departmentTableColumns}
            createFields={departmentFormFields}
            editFields={departmentFormFields}
        />
    );
}

export default Department;
