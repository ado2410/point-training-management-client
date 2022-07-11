interface User {
    id: number;
    user_type_id: number
    username: string;
    password: string;
    repass?: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    student?: Student;
}