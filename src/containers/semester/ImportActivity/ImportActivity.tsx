import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, message, PageHeader, Typography } from "antd";
import { useEffect, useState } from "react";
import Import from "../../../components/Import/Import";
import { handleServerErrorImport } from "../../../utils/error";
import { SERVER_URL } from "../../../utils/request";
import { activityImportColumns } from "./ImportActivity.constants";
import { getOptionsService, importActivitiesService } from "./ImportActivity.services";

interface ImportActivityProps {
    semesterId: number;
    onChange: () => void;
}

export const ImportActivity: React.FC<ImportActivityProps> = (props) => {
    const {semesterId, onChange} = props;
    const [importErrors, setImportErrors] = useState<ImportError[]>([]);
    const [options, setOptions] = useState<SettingOption>();

    useEffect(() => {
        (async () => {
            setOptions(await getOptionsService());
        })();
    }, [semesterId]);

    const handleImport = async (rows: Record<string, any>[]) => {
        message.loading({key: "setting-import-activity", content: "Đang nhập"});
        importActivitiesService(
            rows,
            async () => {
                onChange();
                message.success({key: "setting-import-activity", content: "Đã nhập"});
            },
            responseData => {
                setImportErrors(handleServerErrorImport(responseData.errors));
                message.error({key: "setting-import-general", content: "Nhập lỗi, vui lòng kiểm tra lại dữ liệu!"});
            }
        );
    }

    const handleDownloadTemplate = () => {
        window.open(`${SERVER_URL}/public/files/activities.xlsx`);
    }

    return (
        <>
            <PageHeader
                className="page-header"
                title="Nhập danh sách hoạt động từ file excel"
                extra={<Button icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>Tải mẫu</Button>}
            />
            <div style={{width: "100%", backgroundColor: "white", height: "calc(100vh - 261px)"}}>
                <Import
                    errors={importErrors}
                    columns={activityImportColumns(semesterId) || []}
                    onImport={handleImport}
                    options={options as any}
                    scroll={{y: 'calc(100vh - 450px)'}}
                />
            </div>
        </>
    );
}

ImportActivity.defaultProps = {
    semesterId: 0,
    onChange: () => {},
}

export default ImportActivity;