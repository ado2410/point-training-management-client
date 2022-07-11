import {
    Button,
    message,
    Modal,
    PageHeader,
    Select,
    Space,
    Tooltip,
} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Option } from "antd/es/mentions";
import { EditFilled, FileTextOutlined, SyncOutlined } from "@ant-design/icons";
import List from "../../../components/List/List";
import { studentFormFields, studentTableColumns } from "./Student.constants";
import { getClassesService, getStudentDataService, syncPointService, updateSemesterStudentService } from "./Student.services";
import "../../../styles/styles.css";
import "./Student.css";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { handleServerError } from "../../../utils/error";

interface StudentProps {
    semesterId: number;
    onChange: () => void;
}

const Student: React.FC<StudentProps> = (props: StudentProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {semesterId} = props;
    const classId = searchParams.get("class") || undefined;
    const navigate = useNavigate();
    const [data, setData] = useState<ServerListData<Student>>({data: []});
    const [dataIndex, setDataIndex] = useState<number>(-1);
    const currentData = useMemo<Student | undefined>(() => data.data[dataIndex], [data.data, dataIndex]);
    const [classes, setClasses] = useState<ServerListData<Class>>({data: []});
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        (async () => {
            setClasses(await getClassesService());
            getPoint();
        })();
    }, []);

    const getPoint = async (classId: string | undefined = undefined) => {
        setData(await getStudentDataService(semesterId, classId));
    };

    const updateSearchParams = (key: string, value: any) => {
        const params: any = {};
        searchParams.forEach((value, key) => (params[key] = value));
        params[key] = value;
        setSearchParams(params, { replace: true });
    };

    const selectClass = async (id: string) => {
        updateSearchParams("class", id);
        getPoint(id);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = (index: number) => {
        setDataIndex(index);
        setShowModal(true);
    }

    const handleUpdatePoint = () => {
        message.loading({content: "Đang đồng bộ", key: "semester-student-sync"});
        syncPointService(
            semesterId,
            () => {
                message.success({content: "Đã đồng bộ", key: "semester-student-sync"});
                getPoint(classId);
                props.onChange();
            },
            () => {
                message.error({content: "Đồng bộ lỗi", key: "semester-student-sync"});
            }
        )
    }

    const handleUpdate = (values: Record<string, any>) => {
        message.loading({content: "Đang cập nhật", key: "semester-student-update"});
        updateSemesterStudentService(
            currentData?.semester_student?.id,
            values,
            (responseData) => {
                message.success({content: "Đã cập nhật", key: "semester-student-update"});
                data.data[dataIndex].semester_student = responseData as any;
                setData(JSON.parse(JSON.stringify(data)));
                props.onChange();
                closeModal();
            },
            (responseData) => {
                setErrors(handleServerError(responseData.errors));
                message.error({content: "Cập nhật lỗi", key: "semester-student-update"});
            }
        )
    }

    const buttons = (record: any, index: number) => (
        <Space>
            <Tooltip title="Xem phiếu điểm">
                <Button
                    onClick={() =>
                        navigate(
                            `point?semester=${semesterId}&student=${record.id}`
                        )
                    }
                    icon={<FileTextOutlined />}
                >
                </Button>
            </Tooltip>
            <Tooltip title="Chỉnh sửa">
                <Button
                    icon={<EditFilled />}
                    onClick={() => openModal(index)}
                ></Button>
            </Tooltip>
        </Space>
    );

    return (
        <>
            <PageHeader
                className="page-header"
                title="Sinh viên"
                extra={
                    <>
                        <Button
                            icon={<SyncOutlined />}
                            onClick={handleUpdatePoint}
                        >
                            Đồng bộ điểm
                        </Button>
                        <Space className="class">
                            <span>Chọn lớp: </span>
                            <Select
                                className="class-select"
                                value={classId}
                                onChange={selectClass}
                            >
                                <Option value={undefined}>Hiển thị tất cả</Option>
                                {classes.data.map((_class, index) => (
                                    <Option key={index.toString()} value={_class.id.toString()}>
                                        {_class.name}
                                    </Option>
                                ))}
                            </Select>
                        </Space>
                    </>
                }
            />
            <List
                columns={studentTableColumns as any}
                data={data.data}
                buttons={buttons}
            />

            <Modal
                title="Chỉnh sửa thông tin"
                destroyOnClose
                centered
                visible={showModal}
                onCancel={closeModal}
                footer={
                    <Button key="back" onClick={closeModal}>
                        Đóng
                    </Button>
                }
            >
                <CustomForm
                    fields={studentFormFields}
                    errors={errors}
                    initialValues={currentData?.semester_student}
                    onFinish={handleUpdate}
                />
            </Modal>
        </>
    );
}

export default Student;

Student.defaultProps = {
    semesterId: 0,
    onChange: () => {},
}