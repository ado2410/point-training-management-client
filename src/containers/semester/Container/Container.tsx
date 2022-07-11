import { Col, Menu, PageHeader, Row } from "antd";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
    FileDoneOutlined,
    FileTextOutlined,
    FrownOutlined,
    IdcardOutlined,
    PieChartOutlined,
    SettingOutlined,
    TrophyOutlined,
} from "@ant-design/icons";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb/CustomBreadcrumb";
import { useCallback, useEffect, useState } from "react";
import "./Container.css";
import DashboardCount from "../DashboardCount/DashboardCount";
import Setting from "../Setting/Setting";
import Student from "../Student/Student";
import Activity from "../Activity/Activity";
import Attendance from "../Attendance/Attendance";
import Configuration from "../Configuration/Configuration";
import Point from "../Point/Point";
import { getSemesterService } from "./Container.services";
import { UserType } from "../../../store/slices/auth/auth.constants";
import { useSelector } from "react-redux";

interface MenuItemLabelProps {
    left: any;
    right: any;
}

const MenuItemLabel = (props: MenuItemLabelProps) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{props.left || ""}</span>
        <span>{props.right || ""}</span>
    </div>
);

interface ContainerSemester extends Semester {
    studentCount: number;
    activityCount: {type1: number, type2: number, type3: number};
    data: any[];
}

function Container() {
    const auth = useSelector<StoreState, AuthState>(state => state.auth);
    const navigate = useNavigate();
    const params = useParams();
    const semesterId = parseInt(params.semesterId || '');
    const [semester, setSemester] = useState<ContainerSemester>();

    const handleUpdate = useCallback(async () => {
        setSemester(await getSemesterService(semesterId));
    }, [semesterId]);

    useEffect(() => {
        (async () => {
            await handleUpdate();
        })();
    }, [handleUpdate, semesterId]);

    const handleClickMenu = (e: { key: any; }) => {
        navigate(e.key);
    };

    const menus = {
        [UserType.ADMIN]: (
            <>
                <Menu.Item key="" icon={<PieChartOutlined />}>
                    Thống kê
                </Menu.Item>
                <Menu.Item key="students" icon={<FileTextOutlined />}>
                    <MenuItemLabel
                        left="Sinh viên"
                        right={semester?.studentCount}
                    />
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    title="Hoạt động"
                    icon={<IdcardOutlined />}
                >
                    <Menu.Item
                        key="activities?activity_type=1"
                        icon={<IdcardOutlined />}
                    >
                        <MenuItemLabel
                            left="Hoạt động sinh viên"
                            right={semester?.activityCount.type1}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="activities?activity_type=2"
                        icon={<TrophyOutlined />}
                    >
                        <MenuItemLabel
                            left="Khen thưởng"
                            right={semester?.activityCount.type2}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="activities?activity_type=3"
                        icon={<FrownOutlined />}
                    >
                        <MenuItemLabel
                            left="Vi phạm"
                            right={semester?.activityCount.type3}
                        />
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub2"
                    title="Tuỳ chỉnh"
                    icon={<SettingOutlined />}
                >
                    <Menu.Item key="configurations" icon={<SettingOutlined />}>
                        Cấu hình điểm
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        Cài đặt
                    </Menu.Item>
                </Menu.SubMenu>
            </>
        ),
        [UserType.IMPORTER]: (
            <>
                <Menu.Item key="students" icon={<FileTextOutlined />}>
                    <MenuItemLabel
                        left="Sinh viên"
                        right={semester?.studentCount}
                    />
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    title="Hoạt động"
                    icon={<IdcardOutlined />}
                >
                    <Menu.Item
                        key="activities?activity_type=1"
                        icon={<IdcardOutlined />}
                    >
                        <MenuItemLabel
                            left="Hoạt động sinh viên"
                            right={semester?.activityCount.type1}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="activities?activity_type=2"
                        icon={<TrophyOutlined />}
                    >
                        <MenuItemLabel
                            left="Khen thưởng"
                            right={semester?.activityCount.type2}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="activities?activity_type=3"
                        icon={<FrownOutlined />}
                    >
                        <MenuItemLabel
                            left="Vi phạm"
                            right={semester?.activityCount.type3}
                        />
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub2"
                    title="Tuỳ chỉnh"
                    icon={<SettingOutlined />}
                >
                    <Menu.Item key="configurations" icon={<SettingOutlined />}>
                        Cấu hình điểm
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        Cài đặt
                    </Menu.Item>
                </Menu.SubMenu>
            </>
        ),
        [UserType.STUDENT]: (
            <>
                <Menu.Item
                    key={`students/point?semester=${semesterId}&student=${auth.user?.student?.id}`}
                    icon={<FileDoneOutlined />}
                >
                    Điểm rèn luyện
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    title="Hoạt động"
                    icon={<IdcardOutlined />}
                >
                    <Menu.Item
                        key="activities?activity_type=1"
                        icon={<IdcardOutlined />}
                    >
                        <MenuItemLabel
                            left="Hoạt động sinh viên"
                            right={semester?.activityCount.type1}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="activities?activity_type=2"
                        icon={<TrophyOutlined />}
                    >
                        <MenuItemLabel
                            left="Khen thưởng"
                            right={semester?.activityCount.type2}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="activities?activity_type=3"
                        icon={<FrownOutlined />}
                    >
                        <MenuItemLabel
                            left="Vi phạm"
                            right={semester?.activityCount.type3}
                        />
                    </Menu.Item>
                </Menu.SubMenu>
            </>
        ),
    };

    return (
        <>
            <PageHeader
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginBottom: 10,
                }}
                title={
                    semesterId
                        ? "Hoạt động từng học kỳ"
                        : "Hoạt động thường niên"
                }
                breadcrumb={
                    <CustomBreadcrumb
                        routes={[
                            { name: "Quản lý hoạt động", path: "/years" },
                            {
                                name: `Năm học ${semester?.year?.name}`,
                                path: `/semesters?year=${semester?.year?.id}`,
                            },
                            {
                                name: `Học kỳ ${semester?.name}`,
                                path: `/activity_types?semester=${semester?.id}`,
                            },
                        ]}
                    />
                }
            />

            <Row style={{ width: "100%" }} gutter={[16, 16]}>
                <Col span={4}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[""]}
                        defaultOpenKeys={[""]}
                        onClick={handleClickMenu}
                        style={{ height: "calc(100vh - 240px)" }}
                    >
                        {auth.userType ? menus[auth.userType] : <></>}
                    </Menu>
                </Col>

                <Col span={20}>
                    <Routes>
                        <Route
                            path=""
                            element={
                                <DashboardCount
                                    semesterId={semesterId}
                                    data={semester?.data || []}
                                />
                            }
                        />
                        <Route
                            path="settings"
                            element={<Setting semesterId={semesterId} onChange={handleUpdate} />}
                        />
                        <Route
                            path="activities"
                            element={
                                <Activity
                                    semesterId={semesterId}
                                    onChange={handleUpdate}
                                />
                            }
                        />
                        <Route
                            path="activities/attendance"
                            element={<Attendance semesterId={semesterId} />}
                        />
                        <Route
                            path="attendance"
                            element={<Attendance semesterId={semesterId} />}
                        />
                        <Route
                            path="configurations"
                            element={<Configuration semesterId={semesterId} />}
                        />
                        <Route
                            path="students"
                            element={<Student semesterId={semesterId} onChange={handleUpdate} />}
                        />
                        <Route
                            path="students/point"
                            element={<Point semesterId={semesterId} />}
                        />
                    </Routes>
                </Col>
            </Row>
        </>
    );
}

export default Container;
