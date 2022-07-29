export const studentTableColumns = [
    {
        title: "Học kỳ",
        render: (record: SemesterStudent) => `Học kỳ ${record.semester?.name} năm học ${record.semester?.year?.name}`
    },
    {
        title: "Điểm rèn luyện",
        dataIndex: "point",
        render: (text: string) => text ? text : "Chưa xét"
    },
    {
        title: "Xếp loại",
        dataIndex: "point",
        key: "grade",
        render: (text: number) => {
            if (!text) return "Chưa xét";
            else if (text >= 90) return "Xuất sắc";
            else if (text >= 80) return "Tốt";
            else if (text >= 65) return "Khá";
            else if (text >= 50) return "Trung bình";
            else if (text >= 35) return "Yếu";
            else return "Kém";
        },
    },
];

export const importerTableColumns = [
    {
        title: "Học kỳ",
        render: (record: Semester) => `Học kỳ ${record?.name} năm học ${record.year?.name}`
    },
    {
        title: "Hoạt động",
        dataIndex: "type_1",
    },
    {
        title: "Khen thưởng",
        dataIndex: "type_2",
    },
    {
        title: "Vi phạm",
        dataIndex: "type_3",
    },
];