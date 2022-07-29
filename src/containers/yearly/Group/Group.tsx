import Index from "../../../templates/Index";
import { useSearchParams } from "react-router-dom";
import { groupFormFields, groupRoutes, groupTableColumns } from "./Group.constants";
import { useEffect, useState } from "react";
import { getGroupService } from "./Group.services";

function Group() {
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("group") || undefined;
    const [group, setGroup] = useState<Group>();

    useEffect(() => {
        (async () => setGroup(await getGroupService(groupId)))();
    }, [groupId]);

    return (
        <Index
            route="/groups"
            params={{ group: groupId }}
            name={`Nhóm ${group ? group.name : ''}`}
            routes={groupRoutes}
            columns={groupTableColumns}
            createFields={groupFormFields(groupId)}
            editFields={groupFormFields(groupId)}
        />
    );
}

export default Group;
