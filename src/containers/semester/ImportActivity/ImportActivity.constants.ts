export const activityImportColumns = (semesterId: number): ImportColumn<SemesterSetting>[] => [
    {
        key: "semester_id",
        dataIndex: "semester_id",
        columnIndex: "",
        hidden: true,
        value: semesterId,
    },
    {
        title: `Loại`,
        key: "activity_type_id",
        dataIndex: "activity_type_id",
        columnIndex: "B",
        value: (text: string) => {
            if (text === "Hoạt động") return 1;
            else if (text === "Khen thưởng") return 2;
            else if (text === "Vi phạm") return 3;
            else if (text === "Điểm") return 4;
            else return "";
        }
    },
    {
        title: `Nhóm hoạt động`,
        key: "group_id",
        dataIndex: "group_id",
        columnIndex: "C",
        parser: "import_groups",
    },
    {
        title: `Tên hoạt động`,
        key: "name",
        dataIndex: "name",
        columnIndex: "D",
    },
    {
        title: "Thời gian bắt đầu",
        key: "time_start",
        dataIndex: "time_start",
        columnIndex: "E",
    },
    {
        title: "Thời gian kết thúc",
        key: "time_end",
        dataIndex: "time_end",
        columnIndex: "F",
    },
    {
        title: "Địa điểm",
        key: "address",
        dataIndex: "address",
        columnIndex: "G",
    },
    {
        title: "Đơn vị tổ chức",
        key: "host",
        dataIndex: "host",
        columnIndex: "H",
    },
    {
        title: "Mô tả",
        key: "description",
        dataIndex: "description",
        columnIndex: "I",
    },
    {
        title: "Kiểu",
        key: "type",
        dataIndex: "type",
        columnIndex: "J",
        value: (text: string) => {
            if (text === "Đánh dấu") return "CHECK";
            else if (text === "Đếm số lần") return "COUNT";
            else if (text === "Lựa chọn") return "ENUM";
            else if (text === "Điểm") return "POINT";
            else return "???";
        }
    },
    {
        title: "Các lựa chọn",
        key: "accepts",
        dataIndex: "accepts",
        columnIndex: "K",
        value: (text: string) => text?.split(",").map(accept => accept.trim()),
    },
    {
        title: "Giá trị mặc định",
        key: "default_value",
        dataIndex: "default_value",
        columnIndex: "L",
    },
];