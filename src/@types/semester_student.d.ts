interface SemesterStudent {
    id: number;
    semester_id: number;
    student_id: number;
    created_at: string;
    updated_at: string;
    semester?: Semester;
    student?: Student;
}