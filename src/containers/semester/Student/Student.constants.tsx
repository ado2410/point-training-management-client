import { isAdmin } from "../../../store/slices/auth/auth.constants";
import { formatDate } from "../../../utils/date";

export const semesterStudentCanEdit = (auth:AuthState) => isAdmin(auth);

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
        title: "Họ và tên",
        dataIndex: "name",
        key: "name",
        render: (_text: string, record: Student) => (
            <>
                {record.user?.first_name} {record.user?.last_name}
            </>
        ),
    },
    {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        render: (text: string) => (text === "male" ? "Nam" : "Nữ"),
    },
    {
        title: "Ngày sinh",
        dataIndex: "dob",
        key: "dob",
        render: (text: string) => formatDate(text),
    },
    {
        title: "Chức vụ",
        dataIndex: ["semester_student", "position"],
        key: "position",
        render: (text: string) => {
            switch (text) {
                case "CLASS_MONITOR": return "Lớp trưởng";
                case "CLASS_VICE": return "Lớp phó";
                case "SECRETARY": return "Bí thư";
                case "UNDERSECRETARY": return "Phó bí thư";
                case "COMMISSIONER": return "Ủy viên";
                case "MEMBER": return "Đoàn viên";
                default: return "Chưa cập nhật";
            }
        }
    },
    {
        title: "Điểm rèn luyện",
        dataIndex: ["semester_student", "point"],
        key: "point",
        render: (text: string) => !text ? "Chưa cập nhật" : text,
    },
    {
        title: "Xếp loại",
        dataIndex: ["semester_student", "point"],
        key: "grade",
        render: (text: number) => {
            if (text >= 90) return "Xuất sắc";
            else if (text >= 80) return "Tốt";
            else if (text >= 65) return "Khá";
            else if (text >= 50) return "Trung bình";
            else if (text >= 35) return "Yếu";
            else return "Kém";
        },
    },
];

export const studentFormFields: CustomFormField<any>[] = [
    {
        label: "Chức vụ",
        name: "position",
        type: "select",
        options: [
            {id: "CLASS_MONITOR", name: "Lớp trưởng"},
            {id: "CLASS_VICE", name: "Lớp phó"},
            {id: "SECRETARY", name: "Bí thư"},
            {id: "UNDERSECRETARY", name: "Phó bí thư"},
            {id: "COMMISSIONER", name: "Uỷ viên"},
            {id: "MEMBER", name: "Đoàn viên/Sinh viên"},
        ]
    },
];