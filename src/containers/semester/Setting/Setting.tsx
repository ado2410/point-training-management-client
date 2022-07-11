import {Alert, Button, Card, Col, Menu, message, Modal, PageHeader, Row, Space, Typography} from "antd";
import { AppstoreOutlined, DatabaseOutlined, InboxOutlined, SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../utils/request";
import Import from "../../../components/Import/Import";
import Dragger from "antd/lib/upload/Dragger";
import Form from "../../../components/CustomForm/CustomForm";
import { getOptionsService, getSemesterDataService, importActivitiesService, loadSemesterDataService, saveGeneralSettingService } from "./Setting.services";
import { handleServerError, handleServerErrorImport } from "../../../utils/error";
import { settingGeneralFormFields, settingImportColumns, settingLoadFormFields } from "./Setting.constants";

const Layout = {
    LOADING: "0",
    GENERAL: "1",
    IMPORT_ACTIVITY_EXCEL: "2",
    IMPORT_DATA: "3"
}

const Setting: React.FC<SettingProps> = (props: SettingProps) => {
    const {semesterId, onChange} = props;
    const [semester, setSemester] = useState({year: {}, activities: [], settings: {}, default: true});
    const [importErrors, setImportErrors] = useState<ImportError[]>([]);
    const [layout, setLayout] = useState(Layout.LOADING);
    const [options, setOptions] = useState<SettingOption>({keys: [], editors: []});
    const [loadedFile, setLoadedFile] = useState({});
    const [errors, setErrors] = useState({});
    const [loadValues, setLoadValues] = useState<SettingLoadValues>({semester: true, activity: true, title_activity: true, student_activity: true});

    useEffect(() => {
        (async () => {
            setSemester(await getSemesterDataService(semesterId));
            setOptions(await getOptionsService());
        })();
    }, [semesterId]);

    useEffect(() => {
        if (!semester.default) setLayout(Layout.GENERAL);
    }, [semester]);

    const handleClickMenu = (e: any) => {
        setLayout(e.key);
    }

    const handleSaveGeneralSetting = async (values: Record<string, any>) => {
        message.loading({key: "setting-save-general", content: "Đang lưu"});
        saveGeneralSettingService(
            semesterId,
            values,
            async () => {
                setSemester(await getSemesterDataService(semesterId));
                onChange();
                message.success({key: "setting-save-general", content: "Đã lưu"});
                close();
            },
            responseData => {
                setImportErrors(handleServerErrorImport(responseData.errors));
                message.error({key: "setting-save-general", content: "Lưu lỗi"});
            }
        );
    }

    const handleImport = async (rows: Record<string, any>[]) => {
        message.loading({key: "setting-import-activity", content: "Đang nhập"});
        importActivitiesService(
            rows,
            async () => {
                setSemester(await getSemesterDataService(semesterId));
                onChange();
                message.success({key: "setting-import-activity", content: "Đã nhập"});
                close();
            },
            responseData => {
                setImportErrors(handleServerErrorImport(responseData.errors));
                message.error({key: "setting-save-general", content: "Lưu lỗi"});
            }
        );
    }

    const handleSaveData = async () => {
        window.open(`${SERVER_URL}/semesters/${semesterId}/save`, "_blank");
        close();
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
                setSemester(await getSemesterDataService(semesterId));
                onChange();
                message.success({key: "setting-load-semester-data", content: "Đã nhập"});
                close();
            },
            responseData => {
                setErrors(handleServerError(responseData.errors));
                message.error({key: "setting-load-semester-data", content: "Lưu lỗi"});
            }
        );
    }

    const importFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const loadedFile = JSON.parse(e.target?.result as string);
            setLoadedFile(loadedFile);
        }

        reader.readAsText(file);
    }

    const close = () => {
        setImportErrors([]);
    }

    const layouts = {
        [Layout.LOADING]: <>Đang tải</>,
        [Layout.GENERAL]: (
            <>
                <Typography.Title level={4} style={{textAlign: "center"}}>Cài đặt chung</Typography.Title>
                <Form
                    fields={settingGeneralFormFields(options)}
                    initialValues={semester.settings}
                    col={{label: 5, wrapper: 21}}
                    submitLabel="Lưu thay đổi"
                    onFinish={handleSaveGeneralSetting}
                    errors={errors}
                />
            </>
        ),
        [Layout.IMPORT_ACTIVITY_EXCEL]: (
            <>
                <Typography.Title level={4} style={{textAlign: "center"}}>Nhập danh sách hoạt động từ file excel</Typography.Title>
                <Import
                    errors={importErrors}
                    columns={settingImportColumns(semesterId) || []}
                    onImport={handleImport}
                    options={options as any}
                    scroll={{y: 'calc(100vh - 580px)'}}
                />
            </>
        ),
        [Layout.IMPORT_DATA]: (
            <>
                <Typography.Title level={4} style={{textAlign: "center"}}>Xuất dữ liệu</Typography.Title>
                <Space direction="vertical" style={{width: "100%", alignItems: "center"}}>
                    <Button onClick={handleSaveData} icon={<SaveOutlined />}>Xuất dữ liệu</Button>
                </Space>
                <Typography.Title level={4} style={{textAlign: "center"}}>Nhập dữ liệu</Typography.Title>
                <Space direction="vertical" style={{width: "100%", alignItems: "center"}}>
                    <Dragger
                        beforeUpload={(file) => {
                            importFile(file);
                            return false;
                        }}
                        maxCount={1}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Chọn hoặc kéo file vào khung nhập</p>
                    </Dragger>
                    <Form
                        col={{label: 16, wrapper: 8}}
                        layout="inline"
                        fields={settingLoadFormFields(loadValues)}
                        hideSubmitButton={true}
                        onValuesChange={(values) => setLoadValues(values)}
                    />
                    <Alert message="Lưu ý: Dữ liệu nhập sẽ ghi đè lên dữ liệu hiện tại!" type="warning" showIcon />
                    <Button onClick={handleLoadData} type="primary">Nhập</Button>
                </Space>
            </>
        ),
    }

    return (
        <>
            <PageHeader
                style={{width: "100%", backgroundColor: "white", marginBottom: 10}}
                title={semesterId ? "Hoạt động từng học kỳ" : "Hoạt động thường niên"}
            />
            <Row style={{width: "100%", flexGrow: 1}} gutter={[16, 16]}>
                <Col span={4}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[Layout.GENERAL]}
                        defaultOpenKeys={['']}
                        onClick={handleClickMenu}
                    >
                        <Menu.Item key={Layout.GENERAL} icon={<AppstoreOutlined />}>Chung</Menu.Item>
                        <Menu.Item key={Layout.IMPORT_ACTIVITY_EXCEL} icon={<DatabaseOutlined />}>Nhập danh sách hoạt động</Menu.Item>
                        <Menu.Item key={Layout.IMPORT_DATA} icon={<DatabaseOutlined />}>Nhập/xuất học kỳ</Menu.Item>
                    </Menu>
                </Col>
                <Col span={20} style={{display: "flex", width: "100%", flexGrow: 1}}>
                    <Card style={{width: "100%", flexGrow: 1}}>
                        {layouts[layout]}
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Setting;

Setting.defaultProps = {
    semesterId: 0,
    onChange: () => {},
}