import { Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getActivityTypeAction } from "../../utils/activity";
import request from "../../utils/request";

const EditableCell: React.FC<EditableCellProps> = (props: EditableCellProps) => {
    const {editable, activity, children, record,...restProps} = props;
    const [editing, setEditing] = useState(false);
    const [student, setStudent] = useState(record);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (editing && inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [editing]);

    useEffect(() => {
        setStudent(record);
    }, [record]);

    const toggleEditing = () => {
        setEditing(!editing);
    }

    const saveChange = async (student_id: number, activity_id: number, value: any) => {
        const data: StudentActivity = {
            id: null as unknown as number,
            student_id: student_id,
            activity_id: activity_id,
            value: value,
            created_at: "",
            updated_at: ""
        }

        if (!student.student_activities) student.student_activities = [];
        let studentActivity = student.student_activities?.find(studentActivity => studentActivity.activity_id === activity_id);
        if (studentActivity) studentActivity.value = value;
        else {
            studentActivity = data;
            student.student_activities.push(studentActivity);
        }
        setStudent(student);
        await request.post("/attendance", data);
    }

    let childNode = children;
    if (editable) {
        const studentActivity = student.student_activities?.find(studentActivity => studentActivity.activity_id === activity.id);
        const value = studentActivity?.value || activity.default_value || 0;
        if (editing) {
            if (activity.type === "ENUM") {
                childNode = (
                    <Select
                        ref={inputRef}
                        style={{minWidth: "100px"}}
                        onBlur={toggleEditing}
                        defaultValue={value}
                        onChange={(value) => saveChange(record.id, activity.id, value)}
                    >
                        {activity.accepts.map((accept, index) => <Select.Option key={index} value={index}>{accept}</Select.Option>)}
                    </Select>
                );
            }
            else if (activity.type === "CHECK") {
                    childNode = (
                    <Select
                        ref={inputRef}
                        style={{minWidth: "100px"}}
                        defaultValue={value}
                        onBlur={toggleEditing}
                        onChange={(value) => saveChange(record.id, activity.id, value)}
                    >
                        <Select.Option value={0}>Không {getActivityTypeAction(activity.activity_type_id)}</Select.Option>
                        <Select.Option value={1}>Có {getActivityTypeAction(activity.activity_type_id)}</Select.Option>
                    </Select>
                );
            } else childNode = (
                <Input
                    ref={inputRef}
                    style={{width: "65px"}}
                    type="number"
                    defaultValue={value}
                    onBlur={toggleEditing}
                    onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                            const value = e.target.value;
                            // eslint-disable-next-line eqeqeq
                            const editedValue = (activity.type === "COUNT" ? (value == 0 ? 0 : parseInt(value)) : value) || value;
                            e.target.value = editedValue;
                            saveChange(record.id, activity.id, editedValue);
                            setEditing(false);
                        }
                    }}
                />
            );
        } else {
            if (activity.type === "ENUM") childNode = (
                <div
                    onClick={toggleEditing}
                    style={{fontStyle: !studentActivity?.value ? "italic" : "initial", minWidth: "141px", marginTop: 5, marginBottom: 5}}
                >
                    {activity.accepts[value]}
                </div>
            );
            else if (activity.type === "CHECK") childNode = (
                <div
                    onClick={toggleEditing}
                    style={{fontStyle: !studentActivity?.value ? "italic" : "initial", minWidth: "141px", marginTop: 5, marginBottom: 5}}
                >
                    {studentActivity?.value ? `Có ${getActivityTypeAction(activity.activity_type_id)}` : `Không ${getActivityTypeAction(activity.activity_type_id)}`}
                </div>);
            else childNode = (
                <div
                    onClick={toggleEditing}
                    style={{fontStyle: !studentActivity?.value ? "italic" : "initial", width: "65px", marginTop: 5, marginBottom: 5}}
                >
                    {value}
                </div>);
        }
    }
    return <td {...restProps}>{childNode}</td>
}

export default EditableCell;