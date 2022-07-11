import { Button, Typography } from "antd";

export const configurationTableColumns = (openThirdTitleActivity: (record: any) => void) => [
    {
        title: "Tiêu chí đánh giá",
        dataIndex: "title",
        key: "title",
        render: (text: string, record: CustomThirdTitle) => {
            if (record.type === "primary") return <b>{text.toUpperCase()}</b>;
            else if (record.type === "secondary") return <b>{text}</b>;
            else return text;
        },
    },
    {
        title: "Điểm tối đa",
        dataIndex: "max_point",
        key: "max_point",
        width: 120,
    },
    {
        title: "Điểm mặc định",
        dataIndex: "default_point",
        key: "default_point",
        width: 130,
    },
    {
        title: "Các hoạt động đánh giá",
        dataIndex: "config",
        key: "config",
        render: (text: string, record: CustomThirdTitle) => {
            if (record.type === "third")
                return record.title_activities?.map(title_activity =>
                    <Typography>[{title_activity.activity?.code}] {title_activity.activity?.name}</Typography>
                );
        },
    },
    {
        title: "Hành động",
        dataIndex: "",
        key: "",
        width: 150,
        render: (text: string, record: CustomThirdTitle) => {
            if (record.type === "third") return  <Button onClick={() => openThirdTitleActivity(JSON.parse(JSON.stringify(record)))}>Chỉnh sửa</Button>;
        },
    }
];