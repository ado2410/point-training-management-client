interface SemesterSetting {
    id: number;
    keys: string[];
    editors: number[];
    status: "public" | "private";
}