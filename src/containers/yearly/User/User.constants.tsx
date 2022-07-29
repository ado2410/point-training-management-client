import { Input } from "antd";

export const userRoutes = [
    { name: "Quản lý tài khoản", path: "/users" }
];

export const userTableColumns = [
    {
        title: "Tên tài khoản",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Họ và tên",
        dataIndex: "name",
        key: "name",
        render: (_text: any, record: User) => (
            <>
                {record.first_name} {record.last_name}
            </>
        ),
    },
    {
        title: "Loại tài khoản",
        dataIndex: ["user_type", "name"],
        key: "user_type",
    },
];

export const userCreateFormFields: CustomFormField<User>[] = [
    {
        label: "Loại tài khoản",
        name: "user_type_id",
        type: "select",
        options: [
            { id: 1, name: "Người quản trị" },
            { id: 2, name: "Người nhập liệu" },
        ],
    },
    {
        label: "Họ",
        name: "first_name",
    },
    {
        label: "Tên",
        name: "last_name",
    },
    {
        label: "Tên tài khoản",
        name: "username",
    },
    {
        label: "Email",
        name: "email",
    },
    {
        label: "Mật khẩu",
        name: "password",
        component: <Input.Password />,
        validateStatus: (values) =>
            (values.password !== values.repass && values.repass) ? 'error' : 'validating',
        help: (values) =>
            (values.password !== values.repass && values.repass) ? "Không khớp với nhập lại mật khẩu" : "",
    },
    {
        label: "Nhập lại mật khẩu",
        name: "repass",
        component: <Input.Password />,
        validateStatus: (values) =>
            (values.password !== values.repass && values.repass) ? 'error' : 'validating',
        help: (values) =>
            (values.password !== values.repass && values.repass) ? "Không khớp với mật khẩu" : "",
    },
];

export const userEditFormFields: CustomFormField<User>[] = [
    {
        label: "Loại tài khoản",
        name: "user_type_id",
        disabled: true,
        type: "select",
        options: [
            { id: 1, name: "Người quản trị" },
            { id: 2, name: "Người nhập liệu" },
        ],
    },
    {
        label: "Họ",
        name: "first_name",
    },
    {
        label: "Tên",
        name: "last_name",
    },
    {
        label: "Tên tài khoản",
        name: "username",
        disabled: true,
    },
    {
        label: "Email",
        name: "email",
    },
    {
        label: "Mật khẩu",
        name: "password",
        component: <Input.Password />,
        validateStatus: (values) =>
            (values.password !== values.repass && values.repass) ? 'error' : 'validating',
        help: (values) =>
            (values.password !== values.repass && values.repass) ? "Không khớp với nhập lại mật khẩu" : "",
    },
    {
        label: "Nhập lại mật khẩu",
        name: "repass",
        component: <Input.Password />,
        validateStatus: (values) =>
            (values.password !== values.repass && values.repass) ? 'error' : 'validating',
        help: (values) =>
            (values.password !== values.repass && values.repass) ? "Không khớp với mật khẩu" : "",
    },
];