enum ActivityActionType {
    CHECK = "CHECK",
    ENUM = "ENUM",
    COUNT = "COUNT",
    POINT = "POINT",
}

interface ActivityAttendance {
    open: boolean;
    start: string;
    end: string;
    level: string;
    departments: string[];
    classes: string[];
    positions: ("CLASS_MONITOR" | "CLASS_VICE" | "SECRETARY" | "UNDERSECRETARY" | "COMMISSIONER" | "MEMBER")[];
}

interface Activity {
    id: number;
    semester_id: number;
    activity_type_id: number;
    code: string;
    name: string;
    time_start: string;
    time_end: string;
    address: string;
    host: string;
    description: string;
    type: ActivityActionType;
    default_value: number;
    accepts: string[];
    default_value: number;
    attendance: ActivityAttendance;
    created_at: string;
    updated_at: string;
    can_modify?: boolean;
    can_modify_attendance?: boolean;
    semester?: Semester;
    group?: Group;
}