import { Button, Typography } from "antd";
import { isAdmin } from "../../../store/slices/auth/auth.constants";

export const configurationTableColumns = (openThirdTitleActivity: (record: any) => void, auth: AuthState) => {
    const columns: any[] = [
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
            title: "Mô tả đánh giá",
            dataIndex: "",
            key: "description",
            render: (_text: string, record: PointThirdTitle) => {
                if (record.type !== "third") return "";
                if (!record.description) return "Không có mục cộng điểm";
                return record.description.map(description => description.html);
            }
        },
    ];

    if (isAdmin(auth))
        columns.push({
            title: "Hành động",
            dataIndex: "",
            key: "",
            align: "center",
            width: 150,
            render: (text: string, record: CustomThirdTitle) => {
                if (record.type === "third") return <Button onClick={() => openThirdTitleActivity(JSON.parse(JSON.stringify(record)))}>Chỉnh sửa</Button>;
            }
        });
    return columns;
}
