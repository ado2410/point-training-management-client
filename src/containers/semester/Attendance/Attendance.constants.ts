export const attendanceTableColumns = [
    {
        title: "Lớp",
        dataIndex: ["class", "name"],
        key: "class_name",
        fixed: "left",
    },
    {
        title: "MSSV",
        dataIndex: "student_code",
        key: "student_code",
        fixed: "left",
    },
    {
        title: "Họ và tên",
        dataIndex: "name",
        key: "name",
        fixed: "left",
        render: (_text: string, record: any) => `${record.user.first_name} ${record.user.last_name}`
    },
    {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        fixed: "left",
        width: 100,
        render: (text: string) => text === "male" ? "Nam" : "Nữ",
    },
];