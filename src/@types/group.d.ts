interface Group {
    id: number;
    code: string;
    name: string;
    group_id?: number;
    created_at: string;
    updated_at: string;
    parent?: Group;
    children?: Group[];
    group_users: GroupUser[];
}