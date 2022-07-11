import {Layout, Menu, Typography} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {useNavigate, Routes, Route} from "react-router-dom";
import User from "./yearly/User/User";
import Department from "./yearly/Department/Department";
import Major from "./yearly/Major/Major";
import Class from "./yearly/Class/Class";
import Student from "./yearly/Student/Student";
import Year from "./yearly/Year/Year";
import Semester from "./semester/Semester/Semester";
import {ApartmentOutlined, BarsOutlined, IdcardOutlined, PieChartOutlined, UserOutlined} from "@ant-design/icons";
import "./Backend.css";
import Container from "./semester/Container/Container";
import Dashboard from "./yearly/Dashboard/Dashboard";

function Backend() {
    const navigate = useNavigate();

    const handleClickMenu = (e) => {
        navigate(e.key);
    }

    return (
        <Layout className="root">
            <Sider>
                <div style={{height: 64, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography.Title level={3} style={{color: "white"}}>SINH VIÊN</Typography.Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    defaultOpenKeys={['']}
                    onClick={handleClickMenu}
                >
                    <Menu.Item key="/" icon={<PieChartOutlined />}>Thống kê</Menu.Item>
                    <Menu.Item key="/user" icon={<ApartmentOutlined />}>Thông tin cá nhân</Menu.Item>
                    <Menu.Item key="/semesters" icon={<ApartmentOutlined />}>Hoạt động</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content className="main" style={{padding: 10}}>
                    <Routes>
                        <Route path="/"element={<Dashboard/>}/>
                        <Route path="/users"element={<User/>}/>
                        <Route path="/departments"element={<Department/>}/>
                        <Route path="/majors"element={<Major/>}/>
                        <Route path="/classes"element={<Class/>}/>
                        <Route path="/students"element={<Student/>}/>
                        <Route path="/years"element={<Year/>}/>
                        <Route path="/semesters"element={<Semester/>}/>
                        <Route path="/semesters/:semesterId/*" element={<Container/>}/>
                    </Routes>
                </Content>
                <Typography style={{textAlign: "center", marginTop: 10, marginBottom: 10}}>@2022 Hệ thống quản lý điểm rèn luyện sinh viên tại UDCK</Typography>
            </Layout>
        </Layout>
    );
}

export default Backend;