import Index from "../../../templates/Index";
import { useSearchParams } from "react-router-dom";
import { classFormFields, classRoutes, classTableColumns } from "./Class.constants";

function Class() {
    const [searchParams] = useSearchParams();
    const majorId = searchParams.get("major") || undefined; 

    return (
        <Index
            route="/classes"
            params={{ major: majorId }}
            name="Lớp sinh hoạt"
            routes={classRoutes}
            columns={classTableColumns}
            createFields={classFormFields(majorId)}
            editFields={classFormFields(majorId)}
        />
    );
}

export default Class;
