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
import { EditFilled, FileTextOutlined, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import List from "../../../components/List/List";
import { semesterStudentCanEdit, studentFormFields, studentTableColumns } from "./Student.constants";
import { getClassesService, getSemesterService, getStudentDataService, syncPointService, updateSemesterStudentService } from "./Student.services";
import "../../../styles/styles.css";
import "./Student.css";
import CustomForm from "../../../components/CustomForm/CustomForm";
import { handleServerError } from "../../../utils/error";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/date";
import Search from "../../../components/Search/Search";

interface StudentProps {
    semesterId: number;
    onChange: () => void;
}

const Student: React.FC<StudentProps> = (props: StudentProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = useSelector<StoreState, AuthState>(state => state.auth);
    const {semesterId} = props;
    const classId = searchParams.get("class") || undefined;
    const keyword = searchParams.get("search") || undefined;
    const navigate = useNavigate();
    const [data, setData] = useState<ServerListData<Student>>({data: []});
    const [dataIndex, setDataIndex] = useState<number>(-1);
    const currentData = useMemo<Student | undefined>(() => data.data[dataIndex], [data.data, dataIndex]);
    const [classes, setClasses] = useState<ServerListData<Class>>({data: []});
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [semester, setSemester] = useState<Semester>();
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        (async () => {
            setClasses(await getClassesService());
            setSemester(await getSemesterService(semesterId));
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const getStudents = async () => {
        setData(await getStudentDataService(semesterId, classId, keyword));
    };

    const updateSearchParams = (key: string, value: any) => {
        const params: any = {};
        searchParams.forEach((value, key) => (params[key] = value));
        if (!value) delete params[key];
        else params[key] = value;
        setSearchParams(params, { replace: true });
    };

    const selectClass = async (id: string) => {
        updateSearchParams("class", id);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = (index: number) => {
        setDataIndex(index);
        setShowModal(true);
    }

    const handleSearch = (value: string) => {
        updateSearchParams("search", value);
    }

    const handleClearSearch = () => {
        updateSearchParams("search", '');
    }

    const handleSyncPoint = () => {
        message.loading({content: "Đang đồng bộ", key: "semester-student-sync"});
        setSyncing(true);
        syncPointService(
            semesterId,
            async () => {
                message.success({content: "Đã đồng bộ", key: "semester-student-sync"});
                getStudents();
                setSemester(await getSemesterService(semesterId));
                setSyncing(false);
                props.onChange();
            },
            () => {
                message.error({content: "Đồng bộ lỗi", key: "semester-student-sync"});
                setSyncing(false);
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
            <Tooltip title="Xem đánh giá">
                <Button
                    onClick={() =>
                        navigate(
                            `point?semester=${semesterId}&student=${record.id}`
                        )
                    }
                    icon={<FileTextOutlined />}
                ></Button>
            </Tooltip>
            {semesterStudentCanEdit(auth) ? (
                <Tooltip title="Chỉnh sửa">
                    <Button
                        icon={<EditFilled />}
                        onClick={() => openModal(index)}
                    ></Button>
                </Tooltip>
            ) : (
                <></>
            )}
        </Space>
    );

    return (
        <>
            <PageHeader
                className="page-header"
                title="Sinh viên"
                extra={
                    <>
                        {semester?.sync_at ? (
                            <i>
                                Đồng bộ lần cuối lúc{" "}
                                {formatDate(
                                    semester?.sync_at,
                                    "HH:mm DD/MM/YYYY"
                                )}
                            </i>
                        ) : (
                            <i>Chưa được đồng bộ</i>
                        )}

                        {syncing ? (
                            <Button icon={<LoadingOutlined />} disabled>
                                Đang đồng bộ
                            </Button>
                        ) : (
                            <Button
                                icon={<SyncOutlined />}
                                onClick={handleSyncPoint}
                            >
                                Đồng bộ điểm
                            </Button>
                        )}
                        
                        <Space className="class">
                            <span>Chọn lớp: </span>
                            <Select
                                className="class-select"
                                value={classId || null}
                                onChange={selectClass}
                            >
                                <Option value={undefined}>
                                    Hiển thị tất cả
                                </Option>
                                {classes.data.map((_class, index) => (
                                    <Option
                                        key={index.toString()}
                                        value={_class.id.toString()}
                                    >
                                        {_class.name}
                                    </Option>
                                ))}
                            </Select>
                        </Space>

                        <Search onSearch={handleSearch} onClearSearch={handleClearSearch} />
                    </>
                }
            />
            <List
                columns={studentTableColumns as any}
                data={data.data}
                buttons={buttons}
                tableProps={{ scroll: { y: "calc(100vh - 262px)" } }}
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