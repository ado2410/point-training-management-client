interface GroupUser {
    id: number;
    user_id: number;
    group_id: number;
    created_at: string;
    updated_at: string;
    user: User;
    group: Group;
}