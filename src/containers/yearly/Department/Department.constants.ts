export const departmentRoutes: CustomBreadCrumbRoute[] = [
    {name: "Quản lý khoa", path: "/departments"},
];

export const departmentTableColumns = [
    {
        title: "Tên khoa",
        dataIndex: "name",
        key: "name",
    },
];

export const departmentFormFields: CustomFormField<Department>[] = [
    {
        label: "Tên khoa",
        name: "name",
    },
];