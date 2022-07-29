import { Input, Typography } from "antd";
import moment from "moment";
import { getActivityType, getActivityTypeAction } from "../../../utils/activity";
import { formatDate } from "../../../utils/date";

export const preInsertAndUpdate = (values: any) => {
    values.accepts = Array.isArray(values.accepts) ? values.array : values.accepts ? values.accepts.replaceAll(", ", ",").split(",") : null;
    values.default_value = values.default_value || 0;
    values.attendance = {};
    values.attendance_open = values.attendance_open || false;
    values.attendance.open = values.attendance_open || false;
    values.attendance.start = values.attendance_start ? moment(values.attendance_start).format('YYYY-MM-DD HH:mm:ss') : null;
    values.attendance.end = values.attendance_end ? moment(values.attendance_end).format('YYYY-MM-DD HH:mm:ss') : null;
    values.attendance.level = values.attendance_level;
    values.attendance.departments = values.attendance_departments;
    values.attendance.classes = values.attendance_classes;
    values.attendance.positions = values.attendance_positions;
    return values;
}

export const showTimeDescription = (record:Activity) => {
    let text = <></>;
    const start = formatDate(record.time_start, "HH:mm DD/MM/YYYY");
    const end = formatDate(record.time_end, "HH:mm DD/MM/YYYY");
    if (start && end) text = <>Từ {start} đến {end}</>;
    else if (end) text = <> Đến hết ngày {end}</>;
    else if (start) text = <> Bắt đầu từ ngày {start}</>;
    else text = <>Cả học kỳ</>;
    return <div><b>Thời gian</b>: {text}</div>
}

export const showAttendanceDescription = (record: Activity) => {
    if (record.attendance.open === true) {
        let text = <></>;
        let start = formatDate(record.attendance.start, "HH:mm DD/MM/YYYY");
        let end = formatDate(record.attendance.end, "HH:mm DD/MM/YYYY");
        if (record.attendance.start && record.attendance.end)
            text = <>Từ {start} tới {end}</>;
        else if (record.attendance.start) text = <>Mở từ ngày {start}</>;
        else if (record.attendance.end) text = <>Tới {end}</>;
        else text = <>Không có thời hạn</>;
        return <div><b>Thời hạn đánh giá: </b> {text}</div>;
    } else return '';
}

export const activityCanModifyAttendance = (record: Activity) => Boolean(record.can_modify_attendance);

export const activityCanModify = (record: Activity) => Boolean(record.can_modify);

export const activityTableColumns = (activityTypeId: number) => {
    const activityType = getActivityType(activityTypeId);
    return [
        {
            title: `Mã ${activityType}`,
            dataIndex: "code",
            key: "code",
            width: 150,
        },
        {
            title: `Tên ${activityType}`,
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text: string, record: Activity) => (
                <>
                    <Typography><b>Mô tả: </b>{record.description ? record.description : 'Không có mô tả'}</Typography>
                    <Typography><b>Địa chỉ: </b>{record.address ? record.address : 'Không có địa chỉ'}</Typography>
                    <Typography><b>Đơn vị tổ chức: </b>{record.host ? record.host : 'Không biết đơn vị tổ chức'}</Typography>
                    {showTimeDescription(record)}
                    {showAttendanceDescription(record)}
                </>
            ),
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
                return values?.type !== "COUNT" && values?.type !== "POINT"
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
            label: "Mở đánh giá",
            name: "",
            type: "divider",
        },
        {
            label: "Mở đánh giá",
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