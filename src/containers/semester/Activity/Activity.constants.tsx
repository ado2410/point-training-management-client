import { Input } from "antd";
import moment from "moment";
import { getActivityType, getActivityTypeAction } from "../../../utils/activity";

export const preInsertAndUpdate = (values: any) => {
    values.accepts = Array.isArray(values.accepts) ? values.array : values.accepts ? values.accepts.replaceAll(", ", ",").split(",") : null;
    values.default_value = values.default_value || 0;
    values.attendance = {};
    values.attendance.open = values.attendance_open;
    values.attendance.start = moment(values.attendance_start).format('YYYY-MM-DD HH:mm:ss');
    values.attendance.end = moment(values.attendance_end).format('YYYY-MM-DD HH:mm:ss');
    values.attendance.level = values.attendance_level;
    values.attendance.departments = values.attendance_departments;
    values.attendance.positions = values.attendance_positions;
    return values;
}

export const activityCanModify = (record: Activity) => Boolean(record.can_modify);

export const activityTableColumns = (activityTypeId: number) => {
    const activityType = getActivityType(activityTypeId);
    return [
        {
            title: `Mã ${activityType}`,
            dataIndex: "code",
            key: "code",
        },
        {
            title: `Tên ${activityType}`,
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Thời gian",
            dataIndex: "time_start",
            key: "time_start",
            render: (_text: string, record: Activity) => {
                const time_start = record.time_start !== null ? moment(record.time_start?.slice(0, -1)).format("DD/MM/YYYY") : null;
                const time_end = record.time_end !== null ? moment(record.time_end?.slice(0, -1)).format("DD/MM/YYYY") : null;
                if (time_start && time_end) return <>Từ {time_start} đến {time_end}</>
                else if (!time_start && !time_end) return <>Cả học kỳ</>
                else if (time_end) return <> Đến hết ngày {time_end}</>
                else if (time_start) return <> Bắt đầu từ ngày {time_start}</>
            }
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Đơn vị tổ chức",
            dataIndex: "host",
            key: "host",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
    ];
};

export const activityFormFields = (semesterId: number, activityTypeId: number): CustomFormField<Activity>[] => {
    const activityType = getActivityType(activityTypeId);
    const activityTypeAction = getActivityTypeAction(activityTypeId);
    return [
        {
            label: "Học kỳ",
            name: "semester_id",
            type: "hidden",
            initialValue: semesterId || null,
        },
        {
            label: `Loại`,
            name: "activity_type_id",
            type: "hidden",
            initialValue: activityTypeId || null,
        },
        {
            label: `Thuộc nhóm`,
            name: "group_id",
            type: "treeselect",
            showSearch: true,
            options: "groups",
        },
        {
            label: `Tên ${activityType}`,
            name: "name",
        },
        {
            label: "Ngày bắt đầu",
            name: "time_start",
            type: "date",
        },
        {
            label: "Ngày kết thúc",
            name: "time_end",
            type: "date",
        },
        {
            label: "Địa điểm",
            name: "host",
        },
        {
            label: "Kiểu",
            name: "type",
            type: "select",
            options: [
                {id: "CHECK", name: "Đánh dấu"},
                {id: "COUNT", name: "Đếm số lần"},
                {id: "ENUM", name: "Lựa chọn"},
                {id: "POINT", name: "Điểm"},
            ],
            initialValue: "CHECK",
        },
        {
            label: "Các lựa chọn",
            name: "accepts",
            hide: (values) => {
                return values?.type !== "ENUM"
            },
        },
        {
            label: "Mặc định",
            name: "default_value",
            type: "select",
            options: [
                {id: 0, name: `Không ${activityTypeAction}`},
                {id: 1, name: `Có ${activityTypeAction}`}
            ],
            initialValue: 0,
            hide: (values) => {
                return values?.type !== "CHECK" && Boolean(values?.type)
            },
        },
        {
            label: "Mặc định",
            name: "default_value",
            type: "input",
            inputType: "number",
            initialValue: 0,
            hide: (values) => {
                return values?.type !== "COUNT"
            },
        },
        {
            label: "Mặc định",
            name: "default_value",
            type: "select",
            options: (values: any) => {
                if (values?.type === "ENUM")
                    if (typeof values?.accepts === "string") return values?.accepts?.split(",")?.map((accept: string, index: any) => ({id: index, name: accept.trim()}));
                else return values.accepts?.map((accept: any, index: any) => ({id: index, name: accept}));
            },
            initialValue: 0,
            hide: (values) => values?.type !== "ENUM",
        },
        {
            label: "Mô tả",
            name: "description",
            component: <Input.TextArea style={{height: 100}}/>,
        },
        {
            label: "Điểm danh",
            name: "",
            type: "divider",
        },
        {
            label: "Mở điểm danh",
            name: "attendance_open",
            dataIndex: ["attendance", "open"],
            type: "switch",
        },
        {
            label: "Thời gian mở",
            name: "attendance_start",
            dataIndex: ["attendance", "start"],
            type: "datetime",
            disabled: (values: any) => !values.attendance_open,
        },
        {
            label: "Thời gian đóng",
            name: "attendance_end",
            dataIndex: ["attendance", "end"],
            type: "datetime",
            disabled: (values: any) => !values.attendance_open,
        },
        {
            label: "Cấp",
            name: "attendance_level",
            dataIndex: ["attendance", "level"],
            type: "select",
            options: [
                {id: "ALL", name: "Tất cả"},
                {id: "DEPARTMENT", name: "Khoa"},
                {id: "CLASS", name: "Lớp/Chi đoàn"},
            ],
            initialValue: "ALL",
            disabled: (values: any) => !values.attendance_open,
        },
        {
            label: "Khoa",
            name: "attendance_departments",
            dataIndex: ["attendance", "departments"],
            type: "select",
            multiple: true,
            options: "departments",
            hide: (values: any) => values.attendance_level !== "DEPARTMENT",
            disabled: (values: any) => !values.attendance_open,
        },
        {
            label: "Lớp",
            name: "attendance_classes",
            dataIndex: ["attendance", "classes"],
            type: "select",
            showSearch: true,
            multiple: true,
            options: "classes",
            hide: (values: any) => values.attendance_level !== "CLASS",
            disabled: (values: any) => !values.attendance_open,
        },
        {
            label: "Đối tưởng sửa",
            name: "attendance_positions",
            dataIndex: ["attendance", "positions"],
            type: "select",
            multiple: true,
            options: [
                {id: "CLASS_MONITOR", name: "Lớp trưởng"},
                {id: "CLASS_VICE", name: "Lớp phó"},
                {id: "SECRETARY", name: "Bí thư"},
                {id: "UNDERSECRETARY", name: "Phó bí thư"},
                {id: "COMMISSIONER", name: "Uỷ viên"},
                {id: "MEMBER", name: "Đoàn viên/Sinh viên"},
            ],
            disabled: (values: any) => !values.attendance_open,
        },
    ];
}