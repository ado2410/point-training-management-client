interface EditableCellRecord {
    id: number;
    student_activities: Array<StudentActivity>;
}

interface EditableCellProps {
    editable: boolean;
    activity: Activity;
    children: any;
    record: EditableCellRecord;
}
