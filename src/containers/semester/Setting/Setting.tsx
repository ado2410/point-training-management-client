import {Card, message, PageHeader, Typography} from "antd";
import { useEffect, useState } from "react";
import Form from "../../../components/CustomForm/CustomForm";
import { getOptionsService, getSemesterDataService, saveGeneralSettingService } from "./Setting.services";
import {  handleServerErrorImport } from "../../../utils/error";
import { settingGeneralFormFields } from "./Setting.constants";

const Setting: React.FC<SettingProps> = (props: SettingProps) => {
    const {semesterId, onChange} = props;
    const [semester, setSemester] = useState({year: {}, activities: [], settings: {}, default: true});
    const [options, setOptions] = useState<SettingOption>({keys: [], editors: []});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        (async () => {
            setSemester(await getSemesterDataService(semesterId));
            setOptions(await getOptionsService());
        })();
    }, [semesterId]);

    const handleSaveGeneralSetting = async (values: Record<string, any>) => {
        message.loading({key: "setting-save-general", content: "Đang lưu"});
        saveGeneralSettingService(
            semesterId,
            values,
            async () => {
                setSemester(await getSemesterDataService(semesterId));
                onChange();
                message.success({key: "setting-save-general", content: "Đã lưu"});
            },
            responseData => {
                setErrors(handleServerErrorImport(responseData.errors));
                message.error({key: "setting-save-general", content: "Lưu lỗi"});
            }
        );
    }

    return (
        <>
            <PageHeader
                className="page-header"
                title="Cài đặt chung"
            />
            <Card style={{width: "100%", height: "calc(100vh - 261px)"}}>
                {!semester.default ? (
                    <Form
                        fields={settingGeneralFormFields(options)}
                        initialValues={semester.settings}
                        col={{label: 5, wrapper: 21}}
                        submitLabel="Lưu thay đổi"
                        onFinish={handleSaveGeneralSetting}
                        errors={errors}
                    />
                ) : (
                    <Typography>Đang tải...</Typography>
                )}
            </Card>
        </>
    );
}

export default Setting;

Setting.defaultProps = {
    semesterId: 0,
    onChange: () => {},
}