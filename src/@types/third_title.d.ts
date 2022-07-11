interface ThirdTitle {
    title: string;
    id : number;
    secondary_title_id: number;
    order: number;
    title: number;
    max_point: number;
    default_point: number;
    description: string;
    created_at: string;
    updated_at: string;
    delete: number[];
    title_activities?: TitleActivity[];
}