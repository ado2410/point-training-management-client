import { Col, Menu, PageHeader, Row } from "antd";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
    BarsOutlined,
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
import ImportActivity from "../ImportActivity/ImportActivity";
import SemesterIO from "../SemesterIO/SemesterIO";

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
                <Menu.Item key="students" icon={<BarsOutlined />}>
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
                <Menu.Item key="configurations" icon={<FileTextOutlined />}>
                        Cấu hình điểm
                </Menu.Item>
                <Menu.SubMenu
                    key="sub2"
                    title="Cài đặt"
                    icon={<SettingOutlined />}
                >
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        Cài đặt chung
                    </Menu.Item>
                    <Menu.Item key="import_activities" icon={<SettingOutlined />}>
                        Nhập danh sách hoạt động
                    </Menu.Item>
                    <Menu.Item key="semester_io" icon={<SettingOutlined />}>
                        Nhập/Xuất dữ liệu
                    </Menu.Item>
                </Menu.SubMenu>
            </>
        ),
        [UserType.IMPORTER]: (
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
                <Menu.Item key="configurations" icon={<FileTextOutlined />}>
                    Cấu hình điểm
                </Menu.Item>
            </>
        ),
        [UserType.STUDENT]: (
            <>
                <Menu.Item key="" icon={<PieChartOutlined />}>
                    Thống kê
                </Menu.Item>
                <Menu.Item
                    key={`students/point?semester=${semesterId}&student=${auth.user?.student?.id}`}
                    icon={<FileDoneOutlined />}
                >
                    Kết quả rèn luyện
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
                title={`Hoạt động học kỳ ${semester?.name} năm học ${semester?.year?.name}`}
                breadcrumb={
                    <CustomBreadcrumb
                        routes={[
                            { name: "Quản lý hoạt động", path: "/semesters" },
                            {
                                name: `Học kỳ ${semester?.name} năm học ${semester?.year?.name}`,
                                path: `/semesters/${semester?.id}`,
                            },
                        ]}
                    />
                }
            />

            <Row style={{ width: "100%" }}>
                <Col span={4}>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={[""]}
                        defaultOpenKeys={[""]}
                        onClick={handleClickMenu}
                        style={{ height: "calc(100vh - 190px)" }}
                    >
                        {auth.userType ? menus[auth.userType] : <></>}
                    </Menu>
                </Col>

                <Col span={20} style={{paddingLeft: "10px"}}>
                    <Routes>
                        <Route
                            path=""
                            element={
                                <DashboardCount
                                    semesterId={semesterId}
                                    height="calc(100vh - 276px)"
                                />
                            }
                        />
                        <Route
                            path="settings"
                            element={<Setting semesterId={semesterId} onChange={handleUpdate} />}
                        />
                        <Route
                            path="import_activities"
                            element={<ImportActivity semesterId={semesterId} onChange={handleUpdate} />}
                        />
                        <Route
                            path="semester_io"
                            element={<SemesterIO semesterId={semesterId} onChange={handleUpdate} />}
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
