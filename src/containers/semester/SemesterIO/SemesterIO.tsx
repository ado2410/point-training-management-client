import { SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, message, Modal, PageHeader, Row, Space, Typography } from "antd";
import { useState } from "react";
import CustomDragger from "../../../components/CustomDragger/CustomDragger";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { handleServerError } from "../../../utils/error";
import { settingLoadFormFields } from "./SemesterIO.constants";
import { loadSemesterDataService, saveSemesterDataService } from "./SemesterIO.services";

interface ImportActivityProps {
    semesterId: number;
    onChange: () => void;
}

export const SemesterIO: React.FC<ImportActivityProps> = (props) => {
    const {semesterId, onChange} = props;
    const [loadedFile, setLoadedFile] = useState({});
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loadValues, setLoadValues] = useState<SettingLoadValues>({semester: true, semester_student: true, activity: true, title_activity: true, student_activity: true});

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    const importFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const loadedFile = JSON.parse(e.target?.result as string);
            setLoadedFile(loadedFile);
        }
        reader.readAsText(file);
    }

    const handleSaveData = async () => {
        const semesterData = await saveSemesterDataService(semesterId);
        const blob = new Blob([JSON.stringify(semesterData)], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `Data-${semesterId}.json`;
        link.href = url;
        link.click();
    }

    const handleLoadData = async () => {
        const data = {
            loadedFile: loadedFile,
            accepts: loadValues,
        }
        message.loading({key: "setting-load-semester-data", content: "Đang nhập"});
        loadSemesterDataService(
            semesterId,
            data,
            async () => {
                onChange();
                closeModal();
                message.success({key: "setting-load-semester-data", content: "Đã nhập"});
            },
            responseData => {
                setErrors(handleServerError(responseData.errors));
                message.error({key: "setting-load-semester-data", content: "Lưu lỗi"});
            }
        );
    }

    return (
        <>
            <PageHeader
                className="page-header"
                title="Nhập/Xuất dữ liệu"
                extra={<Button onClick={handleSaveData} icon={<SaveOutlined />}>Xuất dữ liệu</Button>}
            />
            <Card style={{width: "100%", flexGrow: 1, height: "calc(100vh - 261px)"}}>
                <Row>
                    <Col xs={16}>
                        <Space direction="vertical" style={{width: "100%", alignItems: "center"}}>
                            <Typography.Title level={5}>Nhập file</Typography.Title>
                            <CustomDragger
                                onUpload={importFile}
                                maxCount={1}
                            />
                            <Button onClick={openModal} type="primary">Nhập</Button>
                        </Space>
                    </Col>
                    <Col xs={8}>
                        <Space direction="vertical" style={{width: "100%", alignItems: "center"}}>
                            <Typography.Title level={5}>Lựa chọn dữ liệu nhập vào</Typography.Title>
                            <Card>
                                <CustomForm
                                    col={{label: 20, wrapper: 4}}
                                    layout="horizontal"
                                    fields={settingLoadFormFields(loadValues)}
                                    hideSubmitButton={true}
                                    onValuesChange={(values) => setLoadValues(values)}
                                />
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Xác nhận nhập"
                destroyOnClose
                centered
                visible={showModal}
                onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal}>
                        Đóng
                    </Button>,
                    <Button
                        key="import"
                        type="primary"
                        onClick={handleLoadData}
                    >
                        Nhập
                    </Button>,
                ]}
            >
                <Alert message="Lưu ý: Dữ liệu nhập sẽ ghi đè lên dữ liệu hiện tại!" type="warning" showIcon />
            </Modal>
        </>
    );
}

SemesterIO.defaultProps = {
    semesterId: 0,
    onChange: () => {},
}

export default SemesterIO;