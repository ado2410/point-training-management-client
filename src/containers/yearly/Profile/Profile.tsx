import { Card, Col, Descriptions, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getSemesterActivitiesService, getSemesterStudentsService, getStudentService, getUserService } from "./Profile.services";
import { useSelector } from "react-redux";
import { importerTableColumns, studentTableColumns } from "./Profile.constants";
import { formatDate } from "../../../utils/date";
import { isImporter, isStudent, UserType } from "../../../store/slices/auth/auth.constants";

interface SemesterActivity {
    semester: Semester;
    type_1: number;
    type_2: number;
    type_3: number;
}

const Profile = () => {
    const [user, setUser] = useState<User>();
    const [student, setStudent] = useState<Student>();
    const [semesterStudents, setSemesterStudents] = useState<ServerListData<SemesterStudent>>();
    const [semesterActivities, setSemesterActivities] = useState<ServerListData<SemesterActivity>>();
    const auth = useSelector<StoreState, AuthState>(state => state.auth);

    useEffect(() => {
        (async () => {
            setUser(await getUserService(auth.user?.id) as any);
            if (isStudent(auth)) {
                setStudent(await getStudentService(auth.user?.student?.id) as any);
                setSemesterStudents(await getSemesterStudentsService(auth.user?.student?.id) as any);
            } else if (isImporter(auth)) {
                setSemesterActivities(await getSemesterActivitiesService() as any);
            }
        })();
    }, []);

    const info = {
        [UserType.IMPORTER]: (
            <>
                <Descriptions.Item label="Tên đăng nhập">{user?.username}</Descriptions.Item>
                <Descriptions.Item label="Họ và tên">{user?.first_name} {user?.last_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            </>
        ),
        [UserType.STUDENT]: (
            <>
                <Descriptions.Item label="Tên đăng nhập">{user?.username}</Descriptions.Item>
                <Descriptions.Item label="MSSV">{student?.student_code}</Descriptions.Item>
                <Descriptions.Item label="Họ và tên">{user?.first_name} {user?.last_name}</Descriptions.Item>
                <Descriptions.Item label="Giới tính">{student?.gender === 'male' ? 'Nam' : 'Nữ'}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{formatDate(student?.dob as any)}</Descriptions.Item>
                <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            </>
        ),
    }

    const table = {
        [UserType.IMPORTER]: (
            <>
                <div className="ant-descriptions-header">
                    <Typography className="ant-descriptions-title">Hoạt động</Typography>
                </div>
                <Table
                    bordered
                    pagination={false}
                    columns={importerTableColumns}
                    dataSource={semesterActivities?.data}
                />
            </>
        ),
        [UserType.STUDENT]: (
            <>
                <div className="ant-descriptions-header">
                    <Typography className="ant-descriptions-title">Điểm rèn luyện</Typography>
                </div>
                <Table
                    bordered
                    pagination={false}
                    columns={studentTableColumns}
                    dataSource={semesterStudents?.data}
                />
            </>
        ),
    }

    return (
        <>
            <Row style={{ width: "100%" }}>
                <Col xs={24} sm={12} style={{paddingRight: "5px"}}>
                    <Card>
                        <Descriptions title="Thông tin cá nhân" bordered column={1}>
                            {auth.userType ? info[auth.userType] : <></>}
                        </Descriptions>
                    </Card>
                </Col>
                <Col xs={24} sm={12} style={{paddingLeft: "5px"}}>
                    <Card>
                        {auth.userType ? table[auth.userType] : <></>}
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Profile;