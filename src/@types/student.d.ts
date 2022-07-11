interface Student {
    id: number;
    user_id: number;
    class_id: number;
    student_code: string;
    gender: string;
    dob: string;
    created_at: string;
    updated_at: string;
    class?: Class;
    user?: User;
    semester_student?: User;
}