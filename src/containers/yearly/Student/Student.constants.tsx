import { Input } from "antd";
import moment from "moment";
import { excelDateToJSDate } from "../../../utils/date";

export const studentRoutes: CustomBreadCrumbRoute[] = [
    {name: "Quản lý sinh viên", path: "/students"},
];

export const studentTableColumns = [
    {
        title: "Lớp",
        dataIndex: ["class", "name"],
        key: "class_name",
    },
    {
        title: "MSSV",
        dataIndex: "student_code",
        key: "student_code",
    },
    {
        title: "Họ",
        dataIndex: ["user", "first_name"],
        key: "first_name",
    },
    {
        title: "Tên",
        dataIndex: ["user", "last_name"],
        key: "last_name",
    },
    {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        render: (text: string) => text === "male" ? "Nam" : "Nữ",
    },
    {
        title: "Ngày sinh",
        dataIndex: "dob",
        key: "dob",
        render: (text: string) => text && moment(text?.slice(0, -1)).format("DD/MM/YYYY"),
    },
    {
        title: "Tên tài khoản",
        dataIndex: ["user", "username"],
        key: "username",
    },
    {
        title: "Email",
        dataIndex: ["user", "email"],
        key: "email",
    },
];

export const studentCreateFormFields = (classId: string | undefined): CustomFormField<Student>[] => [
    {
        label: "MSSV",
        name: "student_code",
    },
    {
        label: "Họ",
        name: "first_name",
        dataIndex: ["user", "first_name"],
    },
    {
        label: "Tên",
        name: "last_name",
        dataIndex: ["user", "last_name"],
    },
    {
        label: "Giới tính",
        name: "gender",
        type: "select",
        options: [
            {id: "male", name: "Nam"},
            {id: "female", name: "Nữ"},
        ],
        initialValue: "male",
    },
    {
        label: "Ngày sinh",
        name: "dob",
        type: "date",
    },
    {
        label: "Lớp",
        name: "class_id",
        type: "select",
        showSearch: true,
        options: "classes",
        initialValue: classId,
    },
    {
        label: "Tên tài khoản",
        name: "username",
        dataIndex: ["user", "username"],
    },
    {
        label: "Mật khẩu",
        name: "password",
        component: <Input.Password />,
    },
    {
        label: "Nhập lại mật khẩu",
        name: "repass",
        component: <Input.Password />,
    },
    {
        label: "Email",
        name: "email",
        dataIndex: ["user", "email"],
    },
];

export const studentEditFormFields = (classId: string | undefined): CustomFormField<Student>[] => [
    {
        label: "MSSV",
        name: "student_code",
    },
    {
        label: "Họ",
        name: "first_name",
        dataIndex: ["user", "first_name"],
    },
    {
        label: "Tên",
        name: "last_name",
        dataIndex: ["user", "last_name"],
    },
    {
        label: "Giới tính",
        name: "gender",
        type: "select",
        options: [
            {id: "male", name: "Nam"},
            {id: "female", name: "Nữ"},
        ],
        initialValue: "male",
    },
    {
        label: "Ngày sinh",
        name: "dob",
        type: "date",
    },
    {
        label: "Lớp",
        name: "class_id",
        type: "select",
        showSearch: true,
        options: "classes",
        initialValue: classId,
    },
    {
        label: "Tên tài khoản",
        name: "username",
        dataIndex: ["user", "username"],
        disabled: true,
    },
    {
        label: "Mật khẩu",
        name: "password",
        component: <Input.Password />,
    },
    {
        label: "Nhập lại mật khẩu",
        name: "repass",
        component: <Input.Password />,
    },
    {
        label: "Email",
        name: "email",
        dataIndex: ["user", "email"],
    },
];

export const studentImportColumns: ImportColumn<Student>[] = [
    {
        title: "Lớp",
        key: "class_id",
        dataIndex: "class_id",
        columnIndex: "B",
        parser: "classes",
    },
    {
        title: "MSSV",
        key: "student_code",
        dataIndex: "student_code",
        columnIndex: "C",
    },
    {
        title: "Họ",
        key: "first_name",
        dataIndex: "first_name",
        columnIndex: "D",
    },
    {
        title: "Tên",
        key: "last_name",
        dataIndex: "last_name",
        columnIndex: "E",
    },
    {
        title: "Giới tính",
        key: "gender",
        dataIndex: "gender",
        columnIndex: "F",
        value: (text: string) => {
            if (text === "Nam") return "male";
            else if (text === "Nữ") return "female";
            else return "text";
        }
    },
    {
        title: "Ngày sinh",
        key: "dob",
        dataIndex: "dob",
        columnIndex: "G",
        value: (text: any) => excelDateToJSDate(text),
    },
    {
        title: "Tên tài khoản",
        key: "username",
        dataIndex: "username",
        columnIndex: "H",
    },
    {
        title: "Mật khẩu",
        key: "password",
        dataIndex: "password",
        columnIndex: "I",
    },
    {
        title: "Email",
        key: "email",
        dataIndex: "email",
        columnIndex: "J",
    },
];