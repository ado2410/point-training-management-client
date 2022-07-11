import { Col, Input, message, Row, Typography } from "antd";
import CustomForm from "../../../components/CustomForm/CustomForm";
import "./Login.css";
import { loginService } from "./Login.services";
import { useDispatch } from 'react-redux';
import { login } from "../../../store/slices/auth/auth.slice";

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
    const dispatch = useDispatch();

    const handleLogin = (values: LoginField) =>
        loginService(
            values,
            responseData => dispatch(login(responseData)),
            () => message.error({key: "login-error", content: "Sai mật khẩu hoặc tên tài khoản"})
        );

    return (
        <Row className="container">
            <Col span="6" className="form">
                <Typography.Title level={3}>Đăng nhập</Typography.Title>
                <CustomForm
                    fields={fields}
                    onFinish={handleLogin}
                    submitLabel="ĐĂNG NHẬP"
                />
            </Col>
        </Row>
    );
};

export default Login;
