interface Semester {
    id: number;
    name: number;
    year_id: number;
    created_at: string;
    updated_at: string;
    settings: SemesterSetting;
    sync_at?: string;
    created_at: string;
    updated_at: string;
    year?: Year;
}