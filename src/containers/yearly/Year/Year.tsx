import Index from "../../../templates/Index";
import { yearFormFields, yearRoutes, yearTableColumns } from "./Year.constants";

function Year() {
    return (
        <Index
            route="/years"
            name="Năm học"
            routes={yearRoutes}
            columns={yearTableColumns}
            createFields={yearFormFields}
            editFields={yearFormFields}
        />
    );
}

export default Year;
