interface SettingProps {
    semesterId: number;
    onChange: () => void;
}

interface SettingOption {
    keys?: CustomSelectOption[];
    editors?: CustomSelectOption[];
}

interface SettingLoadValues {
    semester: boolean;
    semester_student: boolean;
    activity: boolean;
    title_activity: boolean;
    student_activity: boolean;
}