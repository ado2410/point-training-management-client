export const classRoutes: CustomBreadCrumbRoute[] = [
    {name: "Quản lý lớp sinh hoạt", path: "/classes"},
];

export const classTableColumns = [
    {
        title: "Tên sinh hoạt",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Ngành học",
        dataIndex: ["major", "name"],
        key: "major_name",
    },
];

export const classFormFields = (majorId: string | undefined): CustomFormField<Class>[] => [
    {
        label: "Tên lớp sinh hoạt",
        name: "name",
    },
    {
        label: "Ngành",
        name: "major_id",
        type: "select",
        options: "majors",
        initialValue: majorId,
    },
];