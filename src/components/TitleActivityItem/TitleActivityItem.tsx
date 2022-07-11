import { MinusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import { getActivityTypeAction } from "../../utils/activity";

interface TitleActivityProps {
    titleActivity: TitleActivity;
    onChangeTitleActivity: (title: TitleActivity) => void;
}

const TitleActivityItem: React.FC<TitleActivityProps> = (props: TitleActivityProps) => {
    const {titleActivity, onChangeTitleActivity: onTitleActivityChange} = props;

    const addCondition = () => {
        titleActivity.options.push({
            type: "eq",
            value: 0,
            point: 0,
        });
        onTitleActivityChange(titleActivity);
    }

    const changeCondition = (index: number, key: 'type' | 'value' | 'point', value: any) => {
        if (key === 'type') titleActivity.options[index].type = value;
        if (key === 'value') titleActivity.options[index].value = value;
        if (key === 'point') titleActivity.options[index].point = value;
        onTitleActivityChange(titleActivity);
    }

    const changePoint = (index: number, value: number) => {
        titleActivity.point[index] = value;
        onTitleActivityChange(titleActivity);
    }

    const deleteCondition = (index: number) => {
        titleActivity.options.splice(index, 1);
        onTitleActivityChange(titleActivity);
    }

    const render = () => {
        const components: React.ReactNode[] = [];
        if (titleActivity.activity?.type === "ENUM") {
            components.push(
                titleActivity.activity?.accepts.map((accept, index) =>
                    <Space style={{whiteSpace: "nowrap"}}>
                        {accept}
                        <Input
                            type="number"
                            style={{width: "65px"}}
                            defaultValue={titleActivity.point[index] || 0}
                            onChange={(e) => changePoint(index, parseFloat(e.target.value))}
                        /> điểm.
                    </Space>
                )
            );
        } else if (titleActivity.activity?.type === "COUNT" || titleActivity.activity?.type === "POINT") {
            if (titleActivity.activity?.type === "COUNT") {
                components.push(
                    <Space style={{whiteSpace: "nowrap"}}>
                        <span>Mỗi lần {getActivityTypeAction(titleActivity.activity.activity_type_id)}</span>
                        <Input
                            type="number"
                            style={{width: "65px"}}
                            defaultValue={props.titleActivity.point[0]}
                            onChange={(e) => changePoint(0, parseFloat(e.target.value))}
                        /> điểm.
                    </Space>
                );
            }
    
            components.push(
                titleActivity.options?.map((option, index) => (
                    <Space size="small" style={{whiteSpace: "nowrap"}}>
                        <Button
                            size="small"
                            danger
                            icon={<MinusOutlined/>}
                            onClick={() => deleteCondition(index)}
                        />
                        {titleActivity.activity?.type === "COUNT" ? "Nếu số lần" : "Nếu đạt điểm"}
                        <Select
                            value={option.type}
                            style={{width: "65px"}}
                            onChange={(value) => changeCondition(index, "type", value)}
                        >
                            {[
                                {id: "eq", name: "="},
                                {id: "gt", name: ">"},
                                {id: "lt", name: "<"},
                                {id: "gte", name: ">="},
                                {id: "lte", name: "<="},
                            ].map((item, index) => <Select.Option key={index} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                        <Input
                            type="number"
                            style={{width: "65px"}}
                            defaultValue={option.value}
                            onChange={(e) => changeCondition(index, "value", e.target.value)}
                        />
                        {titleActivity.activity?.type === "COUNT" ? "thì thay bằng" : "thì chấm"}
                        <Input
                            type="number"
                            style={{width: "65px"}}
                            defaultValue={option.point}
                            onChange={(e) => changeCondition(index, "point", e.target.value)}
                        /> điểm.
                    </Space>
                ))
            );
            components.push(
                <Button
                    onClick={addCondition}
                >
                    Thêm điều kiện
                </Button>
            );
        } else if (titleActivity.activity?.type === "CHECK") {
            components.push(
                <Space direction="vertical" style={{whiteSpace: "nowrap"}}>
                    <Space>
                        <span>Có {getActivityTypeAction(titleActivity.activity?.activity_type_id)}</span>
                        <Input
                            type="number"
                            style={{width: "70px"}}
                            defaultValue={props.titleActivity.point[1] || 0}
                            onChange={(e) => changePoint(1, parseFloat(e.target.value))}
                        /> điểm.
                    </Space>
                    <Space>
                        <span>Không {getActivityTypeAction(titleActivity.activity?.activity_type_id)}</span>
                        <Input
                            type="number"
                            style={{width: "70px"}}
                            defaultValue={props.titleActivity.point[0] || 0}
                            onChange={(e) => changePoint(0, parseFloat(e.target.value))}
                        /> điểm.
                    </Space>
                </Space>
            );
        }
        return components;
    };

    const components: React.ReactNode[] = render();
    return <Space direction="vertical">{components}</Space>;
}

export default TitleActivityItem;