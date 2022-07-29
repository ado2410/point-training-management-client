export const pointTableColumns = [
    {
        title: "Tiêu chí đánh giá",
        dataIndex: "title",
        key: "title",
        render: (text: string, record: PointThirdTitle) => {
            if (record.type === "sum") return <b>{text.toUpperCase()}</b>;
            else if (record.type === "primary") return <b>{text.toUpperCase()}</b>;
            else if (record.type === "secondary") return <b>{text}</b>;
            else return text;
        },
    },
    {
        title: "Điểm tối đa",
        dataIndex: "max_point",
        key: "max_point",
        align: "center",
        width: 120,
    },
    {
        title: "Điểm mặc định",
        dataIndex: "default_point",
        key: "default_point",
        align: "center",
        width: 130,
    },
    {
        title: "Điểm",
        dataIndex: "point",
        key: "point",
        align: "center",
        width: 150,
    },
    {
        title: "Lý do cộng điểm",
        dataIndex: "",
        key: "reason",
        width: 300,
        render: (_text: string, record: PointThirdTitle) => {
            if (record.type !== "third") return "";
            if (record.reason.length === 0) return "Không có mục cộng điểm, cộng tối đa";
            return record.reason.map(reason => reason.html);
        }
    },
    {
        title: "Hoạt động đánh giá",
        dataIndex: "",
        key: "description",
        render: (_text: string, record: PointThirdTitle) => {
            if (record.type !== "third") return "";
            if (!record.description) return "Không có mục cộng điểm";
            return record.description.map(description => description.html);
        }
    },
];