interface TitleActivityOption {
    type: "eq" | "lt" | "lte" | "gt" | "gte";
    point: number;
    value: number;
}

interface TitleActivity {
    id: number;
    third_title_id: number;
    activity_id: number;
    semester_id: number;
    point: number[];
    options: TitleActivityOption[];
    created_at: string;
    updated_at: string;
    activities?: Activity[];
    activity?: Activity;
}