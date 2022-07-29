import { Link } from "react-router-dom";
import { isStudent } from "../../../store/slices/auth/auth.constants";

export const semesterRoutes = [
    {name: "Quản lý hoạt động", path: "/semesters"},
];

export const semesterTableColumns = (auth: AuthState) => [
    {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: Semester) => (
            record.settings.status === "public" || !isStudent(auth) ? (
                <Link to={`/semesters/${record.id}`}>
                    Học kỳ {text} năm học {record.year?.name}
                </Link>
            ) : (
                <>Học kỳ {text} năm học {record.year?.name}</>
            )
        ),
    },
    {
        title: "Trạng thái",
        dataIndex: ["settings", "status"],
        key: "status",
        render: (text: string, record: Semester) => record.settings.status === "public" ? "Không khai" : "Riêng tư",
    },
];

export const semesterFormFields: CustomFormField<Semester>[] = [
    {
        label: "Năm học",
        name: "year_id",
        type: "select",
        options: "years",
    },
    {
        label: "Học kỳ",
        name: "name",
        type: "select",
        options: [
            {id: "1", name: "Học kỳ 1"},
            {id: "2", name: "Học kỳ 2"},
        ],
        initialValue: "1",
    },
];

export const semesterCopyFormFields = (yearId: string | undefined): CustomFormField<Semester>[] => [
    {
        label: "Năm học",
        name: "year_id",
        type: "select",
        options: "years",
        initialValue: yearId,
    },
    {
        label: "Học kỳ",
        name: "name",
        type: "select",
        options: [
            {id: "1", name: "Học kỳ 1"},
            {id: "2", name: "Học kỳ 2"},
        ],
        initialValue: "1",
    },
];