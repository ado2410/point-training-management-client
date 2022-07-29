export const settingLoadFormFields = (loadValues: SettingLoadValues): CustomFormField<any>[] => [
    {
        label: "Danh sách hoạt động",
        name: "activity",
        type: "switch",
        disabled: true,
        initialValue: loadValues.activity,
    },
    {
        label: "Cài đặt học kỳ",
        name: "semester",
        type: "switch",
        initialValue: loadValues.semester,
    },
    {
        label: "Thông tin sinh viên",
        name: "semester_student",
        type: "switch",
        initialValue: loadValues.semester_student,
    },
    {
        label: "Đánh giá sinh viên",
        name: "student_activity",
        type: "switch",
        initialValue: loadValues.student_activity,
    },
    {
        label: "Cấu hình hệ thống chấm điểm",
        name: "title_activity",
        type: "switch",
        initialValue: loadValues.title_activity,
    },
];