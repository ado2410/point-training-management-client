interface PrimaryTitle {
    id: number;
    order: number;
    title: string;
    created_at: string;
    updated_at: string;
    secondary_titles?: SecondaryTitle[];
}