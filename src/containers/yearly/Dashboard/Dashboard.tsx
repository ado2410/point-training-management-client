import { Card, Col, Row, Select, Space, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import DashboardCount from "../../semester/DashboardCount/DashboardCount";
import { getSemesterService, getSemestersService } from "./Dashboard.services";

interface SemesterDashboard {
    activityCount: {
        type1: number;
        type2: number;
        type3: number;
    };
    studentCount: number,
}

function Dashboard() {
    const [semesters, setSemesters] = useState<ServerListData<Semester>>();
    const [semester, setSemester] = useState<SemesterDashboard>();
    const [semesterId, setSemesterId] = useState<number>();

    useEffect(() => {
        (async () => {
            const semesters: ServerListData<Semester> = await getSemestersService();
            setSemesters(semesters);
            setSemesterId(semesters?.data[0]?.id);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (semesterId) setSemester(await getSemesterService(semesterId));
        })();
    }, [semesterId]);

    return (
        <>
            <Space style={{width: "100%", marginBottom: 10}}>
                <Typography>Chọn học kỳ:</Typography>
                <Select
                    style={{width: 300}}
                    value={semesterId}
                    onChange={(setSemesterId)}
                >
                    {semesters?.data.map((semester, index) => (
                        <Select.Option key={index} value={semester.id}>Học kỳ {semester.name} năm học {semester.year?.name}</Select.Option>
                    ))}
                </Select>   
            </Space>
            <Row style={{ width: "100%", marginBottom: 10 }} gutter={[16, 16]}>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Sinh viên"
                            value={semester?.studentCount}
                        />
                    </Card>
                </Col>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Hoạt động"
                            value={semester?.activityCount.type1}
                        />
                    </Card>
                </Col>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Khen thưởng"
                            value={semester?.activityCount.type2}
                        />
                    </Card>
                </Col>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Vi phạm"
                            value={semester?.activityCount.type3}
                        />
                    </Card>
                </Col>
            </Row>

            <Row style={{ width: "100%" }} gutter={[16, 16]}>
                <Col span={24}>
                    {semesterId && <DashboardCount semesterId={semesterId} height="calc(100vh - 335px)" />}
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;