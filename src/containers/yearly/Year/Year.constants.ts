export const yearRoutes = [
    {name: "Quản lý năm học", path: "/years"},
];

export const yearTableColumns = [
    {
        title: "Tên",
        dataIndex: "name",
        key: "name",
    },
];

export const yearFormFields: CustomFormField<Year>[] = [
    {
        label: "Tên",
        name: "name",
    },
];