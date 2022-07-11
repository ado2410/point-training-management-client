import Index from "../../../templates/Index";
import { userCreateFormFields, userEditFormFields, userRoutes, userTableColumns } from "./User.constants";

function User() {
    return (
        <Index
            route="/users"
            name="Tài khoản"
            routes={userRoutes}
            columns={userTableColumns}
            createFields={userCreateFormFields}
            editFields={userEditFormFields}
        />
    );
}

export default User;
