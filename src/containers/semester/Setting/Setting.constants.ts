export const settingGeneralFormFields = (options: SettingOption): CustomFormField<SemesterSetting>[] => [
    {
        label: "Khóa xét chọn",
        name: "keys",
        type: "select",
        multiple: true,
        options: options.keys,
    },
    {
        label: "Chế độ",
        name: "status",
        type: "select",
        options: [
            {id: "private", name: "Riêng tư"},
            {id: "public", name: "Công khai"},
        ],
    },
];