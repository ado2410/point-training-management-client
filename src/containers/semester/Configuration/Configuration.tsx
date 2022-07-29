import {useCallback, useEffect, useState} from "react";
import {Button, message, Modal, PageHeader} from "antd";
import FullHeightTable from "../../../components/FullHeightTable/FullHeightTable";
import ThirdTitleActivity from "../../../components/ThirdTitleActivity/ThirdTitleActivity";
import "../../../styles/styles.css";
import { configurationTableColumns } from "./Configuration.constants";
import { getConfigurationDataService, getSemesterService, saveConfigurationService } from "./Configuration.services";
import { flattenTitles } from "./Configuration.actions";
import { getDescription } from "../Point/Point.actions";
import { useSelector } from "react-redux";

const Configuration: React.FC<ConfigurationProps> = (props: ConfigurationProps) => {
    const {semesterId} = props;
    const [data, setData] = useState<ServerListData<CustomThirdTitle>>({data: []});
    const [semester, setSemester] = useState<Semester>(undefined as unknown as Semester);
    const [thirdTitleActivity, setThirdTitleActivity] = useState<CustomThirdTitle>();
    const auth = useSelector<StoreState, AuthState>(state => state.auth);

    const updateConfigurationData = useCallback(async () => {
        const responseData = (await getConfigurationDataService(semesterId));
        const flattenedData = flattenTitles(responseData.data.primary_titles);

        flattenedData.map((item: any) => {
            item.description = getDescription(item as any);
            return item;
        });

        data.data = flattenedData;
        setData({...data});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesterId]);

    useEffect(() => {
        (async () => {
            setSemester(await getSemesterService(semesterId));
            updateConfigurationData();
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesterId]);

    const openThirdTitleActivity = (record: CustomThirdTitle) => {
        setThirdTitleActivity(record);
    }

    const closeThirdTitleActivity = () => {
        setThirdTitleActivity(undefined);
    }

    //Xử lý thêm activities
    const handleAddTitleActivities = (titleActivities: TitleActivity[]) => {
        thirdTitleActivity!.title_activities = [...(thirdTitleActivity?.title_activities || []), ...titleActivities];
        setThirdTitleActivity(thirdTitleActivity);
    }

    //Xử lý xoá activities
    const handleDeleteTitleActivity = (index: number) => {
        const titleActivity = thirdTitleActivity?.title_activities?.splice(index, 1)[0];
        thirdTitleActivity!.title_activities = [...(thirdTitleActivity?.title_activities || [])];
        if (!thirdTitleActivity?.delete) thirdTitleActivity!.delete = [];
        if (titleActivity?.id) thirdTitleActivity?.delete.push(titleActivity.id);
        setThirdTitleActivity(thirdTitleActivity);
    }

    const handleChangeTitleActivity = (titleActivity: TitleActivity, index: number) => {
        thirdTitleActivity!.title_activities![index] = titleActivity;
        setThirdTitleActivity(JSON.parse(JSON.stringify(thirdTitleActivity)));
    }

    const saveChanges = async () => {
        //Chuẩn bị dữ liệu
        const uploadedData: ConfigurationSaveData = {
            title_activities: thirdTitleActivity?.title_activities || [],
            delete: thirdTitleActivity?.delete || [],
        }

        //Lưu thay đổi
        message.loading({key: 'configuration-save', content: 'Đang lưu'});
        saveConfigurationService(
            uploadedData,
            (responseData) => {
                data.data.forEach((title) => {
                    if (title.type === "third" && title.id === thirdTitleActivity?.id)
                        title.title_activities = responseData;
                        title.description = getDescription(title as any) as any;
                });
                setData(data);
                closeThirdTitleActivity();
                message.success({key: 'configuration-save', content: 'Đã lưu'});
            },
            () => message.error({key: 'configuration-save', content: 'Lưu lỗi'})
        );
    }

    return (
        <>
            <PageHeader
                className="page-header"
                title="Cấu hình phiếu điểm"
            />

            <FullHeightTable
                columns={configurationTableColumns(openThirdTitleActivity, auth)}
                dataSource={data.data}
                pagination={false}
                sticky
                scroll={{y: "calc(100vh - 262px)"}}
            />

            <Modal
                title="Các tiêu chí đánh giá"
                destroyOnClose
                centered
                width={1000}
                visible={Boolean(thirdTitleActivity)}
                onCancel={closeThirdTitleActivity}
                footer={[
                    <Button onClick={closeThirdTitleActivity}>Đóng</Button>,
                    <Button type="primary" onClick={saveChanges}>Lưu thay đổi</Button>,
                ]}
            >
                <ThirdTitleActivity
                    title={thirdTitleActivity}
                    semester={semester}
                    onAddTitleActivities={handleAddTitleActivities}
                    onDeleteTitleActivity={handleDeleteTitleActivity}
                    onChangeTitleActivity={handleChangeTitleActivity}
                />
            </Modal>
        </>
    );
}

export default Configuration;

Configuration.defaultProps = {
    semesterId: 0,
}