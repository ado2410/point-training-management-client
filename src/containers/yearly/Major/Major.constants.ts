export const majorRoutes: CustomBreadCrumbRoute[] = [
    {name: "Quản lý ngành học", path: "/majors"},
];

export const majorTableColumns = [
    {
        title: "Tên ngành học",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Khoa",
        dataIndex: ["department", "name"],
        key: "department_name",
    },
];

export const majorFormFields = (departmentId: string | undefined): CustomFormField<Major>[] => [
    {
        label: "Tên ngành học",
        name: "name",
    },
    {
        label: "Khoa",
        name: "department_id",
        type: "select",
        options: "departments",
        initialValue: departmentId,
    },
];