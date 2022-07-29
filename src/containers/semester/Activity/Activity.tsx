import Index from "../../../templates/Index";
import {Button, Select, Tooltip} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CheckOutlined} from "@ant-design/icons";
import { getActivityType } from "../../../utils/activity";
import { activityCanModify, activityCanModifyAttendance, activityFormFields, activityTableColumns, preInsertAndUpdate } from "./Activity.constants";
import { useSelector } from "react-redux";
import { isAdmin, isImporter } from "../../../store/slices/auth/auth.constants";
import { useState } from "react";

enum ShowType {
    ALL, MINE
}

interface ActivityProps {
    semesterId: number,
    onChange: () => void,
}

const Activity: React.FC<ActivityProps> = (props: ActivityProps) => {
    const {semesterId, onChange} = props;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const auth = useSelector<StoreState, AuthState>(state => state.auth);
    const activityTypeId = parseInt(searchParams.get("activity_type") || '');
    const activityType = getActivityType(activityTypeId);
    const [showOption, setShowOption] = useState<ShowType>(ShowType.MINE);

    const buttons = (
        <>
            {/* <Button onClick={() => navigate(`attendance?semester=${semesterId}&activity_type=${activityTypeId}`)} icon={<CheckOutlined/>}>Điểm danh</Button>, */}
            {isImporter(auth) && (
                <Select defaultValue={showOption} onChange={setShowOption}>
                    <Select.Option value={ShowType.ALL}>Hiển thị tất cả</Select.Option>
                    <Select.Option value={ShowType.MINE}>Hiển thị của tôi</Select.Option>
                </Select>
            )}
        </>
    );

    const getParams = () => {
        const params: any = {activity_type: activityTypeId};
        if (semesterId) params.semester = semesterId;
        return params;
    }

    const listButtons = (record: Activity) => (
        activityCanModifyAttendance(record) ? (
            <Tooltip title="Đánh giá">
                <Button onClick={() => navigate(`attendance?activity=${record.id}`)} icon={<CheckOutlined/>}/>
            </Tooltip>
        ) : <></>
    );

    const filterData = (item: Activity) => {
        if (isImporter(auth)) {
            if (showOption === ShowType.ALL) return true;
            else if (showOption === ShowType.MINE) return activityCanModify(item);
            else return true;
        } else return true;
    };

    const canCreate = () => {
        if (isAdmin(auth)) return true;
        else if (isImporter(auth)) return true;
        else return false;
    }

    return (
        <>
            <Index
                route="/activities"
                params={getParams()}
                name={activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                buttons={semesterId ? buttons : []}
                listButtons={listButtons}
                columns={activityTableColumns(activityTypeId)}
                createFields={activityFormFields(semesterId, activityTypeId)}
                editFields={activityFormFields(semesterId, activityTypeId)}
                preInsert={preInsertAndUpdate}
                preUpdate={preInsertAndUpdate}
                onChange={onChange}
                canEdit={activityCanModify}
                canDelete={activityCanModify}
                filterData={filterData}
                canCreate={canCreate()}
                tableProps={{scroll: {y: "calc(100vh - 258px)"}}}
            />
        </>
    );
}

export default Activity;

Activity.defaultProps = {
    semesterId: 0,
    onChange: () => {},
}