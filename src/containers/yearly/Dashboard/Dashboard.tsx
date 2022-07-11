import { Card, Col, Row, Statistic } from "antd";

function Dashboard() {
    return (
        <>
            <Row style={{ width: "100%" }} gutter={[16, 16]}>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Sinh viên"
                            value={2987}
                        />
                    </Card>
                </Col>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Sinh viên học kỳ này"
                            value={887}
                        />
                    </Card>
                </Col>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Sinh viên khoá mới"
                            value={224}
                        />
                    </Card>
                </Col>
                <Col span="6">
                    <Card>
                        <Statistic
                            title="Điểm rèn luyện trung bình"
                            value={7.6}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;