import { Card, Col, Input, message, Row, Typography } from "antd";
import CustomForm from "../../../components/CustomForm/CustomForm";
import "./Login.css";
import { loginService } from "./Login.services";
import { useDispatch } from 'react-redux';
import { login } from "../../../store/slices/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const fields: CustomFormField<LoginField>[] = [
    {
        label: "Tên tài khoản",
        name: "username",
    },
    {
        label: "Mật khẩu",
        name: "password",
        component: <Input.Password />,
    },
];

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (values: LoginField) =>
        loginService(
            values,
            responseData => {
                dispatch(login(responseData));
                navigate("/");
            },
            () => message.error({key: "login-error", content: "Sai mật khẩu hoặc tên tài khoản"})
        );

    return (
        <Row className="container">
            <Col xs="12" sm="12" md="6" lg="6" xl="4">
                <Card
                    title={
                        <>
                            <Typography.Title level={3}>Hệ thống quản lý điểm rèn luyện UDCK</Typography.Title>
                            <Typography>Đăng nhập</Typography>
                        </>
                    }
                >
                    <CustomForm
                        fields={fields}
                        onFinish={handleLogin}
                        submitLabel="ĐĂNG NHẬP"
                    />  
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
