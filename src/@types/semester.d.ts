interface Semester {
    id: number;
    name: number;
    year_id: number;
    created_at: string;
    updated_at: string;
    settings: SemesterSetting;
    year?: Year;
}