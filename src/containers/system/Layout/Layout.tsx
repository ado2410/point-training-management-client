import {Button, Layout, Menu, Space, Tooltip, Typography} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {useNavigate, Routes, Route} from "react-router-dom";
import {ApartmentOutlined, BarsOutlined, IdcardOutlined, LogoutOutlined, PieChartOutlined, UserOutlined} from "@ant-design/icons";
import "./Layout.css";
import Dashboard from "../../yearly/Dashboard/Dashboard";
import User from "../../yearly/User/User";
import Department from "../../yearly/Department/Department";
import Major from "../../yearly/Major/Major";
import Class from "../../yearly/Class/Class";
import Student from "../../yearly/Student/Student";
import Year from "../../yearly/Year/Year";
import Group from "../../yearly/Group/Group";
import Semester from "../../semester/Semester/Semester";
import Container from "../../semester/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/auth/auth.slice";
import { UserType } from "../../../store/slices/auth/auth.constants";
import Profile from "../../yearly/Profile/Profile";

function Backend() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector<StoreState, AuthState>(state => state.auth);

    const handleClickMenu = (e: { key: any; }) => {
        navigate(e.key);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const menus = {
        [UserType.ADMIN]: (
            <>
                <Menu.Item key="/" icon={<PieChartOutlined />}>Thống kê</Menu.Item>
                <Menu.SubMenu key="sub1" title="Hệ thống" icon={<ApartmentOutlined />}>
                    <Menu.Item key="/departments" icon={<ApartmentOutlined />}>Khoa</Menu.Item>
                    <Menu.Item key="/majors" icon={<ApartmentOutlined />}>Ngành học</Menu.Item>
                    <Menu.Item key="/classes" icon={<ApartmentOutlined />}>Lớp học</Menu.Item>
                    <Menu.Item key="/years" icon={<ApartmentOutlined />}>Năm học</Menu.Item>
                    <Menu.Item key="/groups" icon={<ApartmentOutlined />}>Nhóm</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="sub2" title="Tài khoản" icon={<IdcardOutlined />}>
                    <Menu.Item key="/users" icon={<UserOutlined/>}>Admin và NNL</Menu.Item>
                    <Menu.Item key="/students" icon={<UserOutlined/>}>Sinh viên</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="/semesters" icon={<BarsOutlined/>}>Hoạt động</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>Đăng xuất</Menu.Item>
            </>
        ),
        [UserType.IMPORTER]: (
            <>
                <Menu.Item key="/" icon={<UserOutlined/>}>Thông tin cá nhân</Menu.Item>
                <Menu.Item key="/semesters" icon={<BarsOutlined/>}>Hoạt động</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>Đăng xuất</Menu.Item>
            </>
        ),
        [UserType.STUDENT]: (
            <>
                <Menu.Item key="/" icon={<UserOutlined/>}>Thông tin cá nhân</Menu.Item>
                <Menu.Item key="/semesters" icon={<BarsOutlined/>}>Hoạt động</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>Đăng xuất</Menu.Item>
            </>
        ),
        CLIENT: (
            <>
                <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>Đăng xuất</Menu.Item>
            </>
        ),
    };

    const home = {
        [UserType.ADMIN]: <Dashboard />,
        [UserType.IMPORTER]: <Profile />,
        [UserType.STUDENT]: <Profile />,
        CLIENT: <></>,
    }

    return (
        <Layout className="root">
            <Sider collapsible>
                <div className="sider-top">
                    <Typography.Title level={3} className="sider-top-text" style={{color: "white"}}>UDCK</Typography.Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    defaultOpenKeys={['']}
                    onClick={handleClickMenu}
                >
                    {auth.userType ? menus[auth.userType] : menus.CLIENT}
                </Menu>
            </Sider>
            <Layout>
                <Header className="header">
                    <div></div>
                    <Space>
                        <Button type="text">{auth.user?.first_name} {auth.user?.last_name}</Button>
                        <Tooltip title="Đăng xuất">
                            <Button
                                type="text"
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                            />
                            </Tooltip>
                    </Space>
                </Header>
                <Content className="main" style={{padding: 10}}>
                    <Routes>
                        <Route path="/"element={auth.userType ? home[auth.userType] : home.CLIENT}/>
                        <Route path="/users"element={<User/>}/>
                        <Route path="/departments"element={<Department/>}/>
                        <Route path="/majors"element={<Major/>}/>
                        <Route path="/classes"element={<Class/>}/>
                        <Route path="/students"element={<Student/>}/>
                        <Route path="/years"element={<Year/>}/>
                        <Route path="/groups"element={<Group/>}/>
                        <Route path="/semesters"element={<Semester/>}/>
                        <Route path="/semesters/:semesterId/*" element={<Container/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Backend;