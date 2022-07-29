import { PageHeader, Select, Space, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import FullHeightTable from "../../../components/FullHeightTable/FullHeightTable";
import EditableCell from "../../../components/EditableCell/EditableCell";
import { attendanceTableColumns } from "./Attendance.constants";
import {
    getActivitiesService,
    getActivityService,
    getAttendanceService,
    getClassesService,
} from "./Attendance.services";
import "../../../styles/styles.css";
import { isStudent } from "../../../store/slices/auth/auth.constants";
import { useSelector } from "react-redux";

interface AttendanceProps {
    semesterId: number;
}

const Attendance: React.FC<AttendanceProps> = (props) => {
    const { semesterId } = props;
    const auth = useSelector<StoreState, AuthState>(state => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();
    const activityId = searchParams.get("activity") || undefined;
    const classId = searchParams.get("class") || undefined;
    const activityTypeId = parseInt(searchParams.get("activity_type") || "");
    const [data, setData] = useState<ServerListData<any>>({data: []});
    const [classes, setClasses] = useState<ServerListData<Class>>({data: []});
    const [columns, setColumns] = useState([]);
    const [activity, setActivity] = useState<Activity>();

    //Cập nhật columns trong table
    const updateAttendanceTableColumns = (activities: Activity[]) => {        
        const fullyAttendanceTableColumns: any = [...attendanceTableColumns];
        activities.forEach((activity) => {
            fullyAttendanceTableColumns.push({
                title: (
                    <Tooltip placement="bottom" title={activity.name}>
                        {activity.code}
                    </Tooltip>
                ),
                dataIndex: "",
                key: activity.code,
                ellipsis: true,
                onCell: (record: any) => ({
                    record: record,
                    editable: true,
                    activity: activity,
                }),
            });
        });
        setColumns(fullyAttendanceTableColumns);
    }

    const updateAttendance = useCallback(async (classId: number | undefined = undefined) => {
        setData(await getAttendanceService(classId));

        let activities: Activity[] = [];
        //Nếu có activity_id query param
        if (activityId) {
            const activity: Activity = await getActivityService(activityId);
            activities = [activity];
            setActivity(activity);
        } else {
            activities = (await getActivitiesService(semesterId, activityTypeId)).data;
            if (activity !== undefined) {
                activity.name = "Điểm danh";
                activity.activity_type_id = activityTypeId;
            }
            setActivity(activity);
        }
        updateAttendanceTableColumns(activities);
    }, [activity, activityId, activityTypeId, semesterId]);

    useEffect(() => {
        (async () => {
            setClasses(await getClassesService());
            updateAttendance();
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Cập nhật query params
    const updateSearchParams = (key: string, value: any) => {
        const params: any = {};
        searchParams.forEach((value, key) => (params[key] = value));
        params[key] = value;
        setSearchParams(params, { replace: true });
    };

    //Chọn lớp cần điểm danh
    const selectClass = async (id: number) => {
        updateSearchParams("class", id);
        updateAttendance(id);
    };

    return (
        <>
            <PageHeader
                className="page-header"
                title={`[${activity?.code}] ${activity?.name}`}
                extra={
                    <>
                        {!isStudent(auth) ?
                            <Space style={{ width: "100%" }}>
                                <span>Chọn lớp: </span>
                                <Select
                                    style={{ width: "200px" }}
                                    value={(parseInt(classId || '') || null) as any}
                                    onChange={selectClass}
                                >
                                    <Option value={null as any}>Hiển thị tất cả</Option>
                                    {classes?.data.map((_class, index) => (
                                        <Option
                                            key={index.toString()}
                                            value={_class.id as any}
                                        >
                                            {_class.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Space>
                        : <></>}
                    </>
                }
            />
            <FullHeightTable
                scroll={{ x: "max-content", y: "calc(100vh - 262px)" }}
                components={{ body: { cell: EditableCell } }}
                columns={columns}
                dataSource={data?.data}
                bordered
            />
        </>
    );
};

export default Attendance;

Attendance.defaultProps = {
    semesterId: 0,
};
