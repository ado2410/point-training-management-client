import { Button, Form, Modal, Select, Space, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import {
    configurationDefaultTitleActivity,
    thirdTitleTableColumns,
} from "./ThirdTitleActivity.constants";
import { getActivitiesDataService } from "./ThirdTitleActivity.services";

enum ModalType {
    NONE,
    CREATE,
    DELETE,
}

interface ThirdTitleActivityProps {
    title: CustomThirdTitle;
    semester: Semester;
    onAddTitleActivities: (title: TitleActivity[]) => void;
    onDeleteTitleActivity: (index: number) => void;
    onChangeTitleActivity: (titleActivity: TitleActivity, index: number) => void;
}

const ThirdTitleActivity = (props: ThirdTitleActivityProps) => {
    const { title, semester, onAddTitleActivities, onDeleteTitleActivity, onChangeTitleActivity } = props;
    const [activityModal, setActivityModal] = useState<ModalType>(ModalType.NONE);
    const [activities, setActivities] = useState<ServerListData<Activity>>();
    const [titleActivityIndex, setTitleActivityIndex] = useState(-1);
    const [keyword, setKeyword] = useState("");
    const [form] = useForm();

    //Nếu title không phải là third
    if (title.type !== "third") return <></>;

    //Mở thêm activity
    const openAddActivity = async () => {
        setActivityModal(ModalType.CREATE);
        setActivities(await getActivitiesDataService(semester.id));
    };

    //Đóng mở activity
    const closeAddActivity = () => {
        setKeyword("");
        setActivities(undefined);
        setActivityModal(ModalType.NONE);
    };

    //Mở modal xoá activity
    const openDeleteActivity = (index: number) => {
        setActivityModal(ModalType.DELETE);
        setTitleActivityIndex(index);
    };

    //Đóng modal xoá activity
    const closeDeleteActivity = () => {
        setActivityModal(ModalType.NONE);
        setTitleActivityIndex(-1);
    };

    //Thêm title activities mới
    const addTitleActivities = (activityIds: number[]) => {
        const newTitleActivities = activityIds.map((activityId) => addTitleActivity(activityId));
        onAddTitleActivities(newTitleActivities);
        closeAddActivity();
    };

    //Thêm title activity mới
    const addTitleActivity = (activityId: number) => {
        const newTitleActivity: TitleActivity = JSON.parse(JSON.stringify(configurationDefaultTitleActivity));
        newTitleActivity.activity = activities?.data.find(activity => activity.id === activityId);
        newTitleActivity.activity_id = newTitleActivity.activity!.id;
        newTitleActivity.third_title_id = title.id;
        newTitleActivity.semester_id = props.semester.id;
        return newTitleActivity;
    };

    //Xoá title activity
    const deleteTitleActivity = () => {        
        onDeleteTitleActivity(titleActivityIndex);
        closeDeleteActivity();
    };

    const handleChangeTitleActivity = (titleActivity: TitleActivity) => {
        onChangeTitleActivity(titleActivity, titleActivityIndex);
    }

    return (
        <>
            <Table
                columns={thirdTitleTableColumns(openDeleteActivity, handleChangeTitleActivity)}
                dataSource={title.title_activities}
                pagination={false}
            />
            <Space
                align="center"
                style={{ width: "100%" }}
                direction="vertical"
            >
                <Button type="primary" onClick={() => openAddActivity()}>
                    Thêm hoạt động
                </Button>
            </Space>

            <Modal
                title="Thêm hoạt động"
                destroyOnClose
                centered
                visible={Boolean(activityModal === ModalType.CREATE)}
                onCancel={closeAddActivity}
                footer={[
                    <Button onClick={closeAddActivity}>Đóng</Button>,
                    <Button type="primary" onClick={form.submit}>thêm</Button>,
                ]}
            >
                {activityModal === ModalType.CREATE && (
                    <>
                        <Form
                            form={form}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            onFinish={values => addTitleActivities(values.activity_ids)}
                        >
                            <Form.Item label="Hoạt động" name="activity_ids">
                                <Select
                                    showSearch
                                    allowClear
                                    mode="multiple"
                                    onKeyDown={e => setKeyword((e.target as HTMLInputElement).value)}
                                    style={{ width: "100%" }}
                                    filterOption={false}
                                    defaultValue={[]}
                                >
                                    {activities?.data.filter(item =>
                                        keyword === "" ||
                                        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                                        item.code.toLowerCase().includes(keyword.toLowerCase())
                                        )
                                            .map((activity, index) => (
                                                <Select.Option
                                                    key={index}
                                                    value={activity.id}
                                                >
                                                    [{activity.code}]:{" "}
                                                    {activity.name}
                                                </Select.Option>
                                            ))
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Modal>

            <Modal
                title="Xóa hoạt động"
                destroyOnClose
                centered
                visible={Boolean(activityModal === ModalType.DELETE)}
                onCancel={closeDeleteActivity}
                footer={[
                    <Button onClick={closeAddActivity}>Đóng</Button>,
                    <Button danger type="primary" onClick={deleteTitleActivity}>Xóa</Button>,
                ]}
            >
                Xác nhận xóa
            </Modal>
        </>
    );
};

ThirdTitleActivity.defaultProps = {
    title: undefined,
    semester: undefined,
    onAddTitleActivities: () => {},
    onDeleteTitleActivity: () => {},
    onChangeTitleActivity: () => {},
};

export default ThirdTitleActivity;
