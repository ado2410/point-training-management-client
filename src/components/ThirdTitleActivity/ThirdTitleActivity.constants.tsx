import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";
import TitleActivityItem from "../TitleActivityItem/TitleActivityItem";

export const thirdTitleTableColumns = (openDeleteActivity: (index: number) => void, handleChangeTitleActivity: (titleActivity: TitleActivity) => void) => [
    {
        title: "Mã hoạt động",
        dataIndex: ["activity", "code"],
        key: "code",
    },
    {
        title: "Tên hoạt động",
        dataIndex: ["activity", "name"],
        key: "name",
    },
    {
        title: "Điểm",
        dataIndex: "point",
        key: "point",
        render: (_text: any, record: any) => <TitleActivityItem titleActivity={record} onChangeTitleActivity={handleChangeTitleActivity} />,
    },
    {
        title: "Hành động",
        dataIndex: '',
        key: "action",
        render: (_text: any, _record: any, index: any) =>
            <>
                <Button
                    danger
                    onClick={() => {
                        openDeleteActivity(index);
                    }}
                    icon={<DeleteFilled/>}
                />
            </>
    },
];

export const configurationDefaultTitleActivity: CustomTitleActivity = {
    third_title_id: undefined as unknown as number,
    activity_id: undefined as unknown as number,
    semester_id: undefined as unknown as number,
    point: [],
    options: [],
    id: 0,
    created_at: "",
    updated_at: "",
    type: "",
    delete: [],
    activities: [],
    activity: undefined
}