import { Tooltip, Typography } from "antd";
import { getActivityTypeAction } from "../../../utils/activity";
import Text from "antd/es/typography/Text";

export const markToString = (mark: any) => {
    switch (mark) {
        case "eq": return "bằng";
        case "gt": return "lớn hơn";
        case "lt": return "nhỏ hơn";
        case "gte": return "lớn hơn hoặc bằng";
        case "lte": return "nhỏ hơn hoặc bằng";
    }
}

export const renderPoint = (point: number) => {
    if (point > 0) return <Text style={{display: "inline"}} keyboard type="success">+{point} điểm</Text>;
    else if (point < 0) return <Text style={{display: "inline"}} keyboard type="danger">{point} điểm</Text>;
    else return <Text style={{display: "inline"}} keyboard type="warning">0 điểm</Text>;
}

export const renderRawPoint = (point: number) => {
    if (point > 0) return `+${point} điểm`;
    else if (point < 0) return `${point} điểm`;
    else return `0 điểm`;
}

export const getReason = (title: PointThirdTitle) => {
    if (title.type !== "third") return [];
    if (title.title_activities?.length === 0) return [];
    return title.title_activities?.map((titleActivity) => {
        const activity = titleActivity.activity as PointActivity;
        const studentActivity = activity?.student_activity;
        if (activity?.type === "CHECK") {
            return {
                html: (
                    <Tooltip title={activity.name} placement="left">
                        <Text
                            style={{display: "block"}}
                            keyboard
                        >
                            <b>[{activity.code}]</b> {(studentActivity?.value === 1) ? "Có" : "Không"} {getActivityTypeAction(activity.activity_type_id)}
                        </Text>
                    </Tooltip>
                ),
                text: `[${activity.code}] ${(studentActivity?.value === 1) ? "Có" : "Không"} ${getActivityTypeAction(activity.activity_type_id)}`,
            };
        }
        else if (activity?.type === "COUNT") {
            return {
                html: (
                    <Tooltip title={activity.name} placement="left">
                        <Text
                            style={{display: "block"}}
                            keyboard
                        >
                            <b>[{activity.code}]</b> {studentActivity?.value || 0} lần {getActivityTypeAction(activity.activity_type_id)}
                        </Text>
                    </Tooltip>
                ),
                text: `[${activity.code}] ${studentActivity?.value || 0} lần ${getActivityTypeAction(activity.activity_type_id)}`,
            };
        }
        else if (activity?.type === "POINT") {
            return {
                html: (
                    <Tooltip title={activity.name} placement="left">
                        <Text
                            style={{display: "block"}}
                            keyboard
                        >
                            <b>[{activity.code}]</b> Điểm {getActivityTypeAction(activity.activity_type_id)} đạt {studentActivity?.value || 0} điểm
                        </Text>
                    </Tooltip>
                ),
                text: `[${activity.code}] Điểm ${getActivityTypeAction(activity.activity_type_id)} đạt ${studentActivity?.value || 0} điểm`,
            };
        }
        else if (activity?.type === "ENUM") {
            return {
                html: (
                    <Tooltip title={activity.name} placement="left">
                        <Text
                            style={{display: "block"}}
                            keyboard
                        >
                            <b>[{activity.code}]</b> {activity.accepts[studentActivity?.value || activity.default_value]}
                        </Text>
                    </Tooltip>
                ),
                text: `[${activity.code}] ${activity.accepts[studentActivity?.value || activity.default_value]}`,
            };
        }
        else return {
            html: <></>,
            text: '',
        };
    });
}

export const getDescription = (title: PointThirdTitle) => {
    if (title.type !== "third") return [];
    return title.title_activities?.map((titleActivity) => {
        const activity = titleActivity.activity as Activity;
        if (activity.type === "CHECK") {
            return {
                html: (
                    <>
                        <Typography style={{fontWeight: "bold"}}>[{activity.code}] {activity.name}</Typography>
                        <Typography>Có {getActivityTypeAction(activity.activity_type_id)}: {renderPoint(titleActivity.point[1])}</Typography>
                        <Typography>Không {getActivityTypeAction(activity.activity_type_id)}: {renderPoint(titleActivity.point[0])}</Typography>
                    </>
                ),
                text: `[${activity.code}] ${activity.name}\nCó ${getActivityTypeAction(activity.activity_type_id)}: ${renderRawPoint(titleActivity.point[1])}\nKhông ${getActivityTypeAction(activity.activity_type_id)}: ${renderRawPoint(titleActivity.point[0])}`,
            };
        } else if (activity.type === "COUNT") {
            const optionString = titleActivity.options.map(option => `Nếu số lần ${getActivityTypeAction(activity.activity_type_id)} ${markToString(option.type)} ${option.value} thì điểm ${renderRawPoint(option.point)}`).join("\n");
            return {
                html: (
                    <>
                        <Typography style={{fontWeight: "bold"}}>[{activity.code}] {activity.name}</Typography>
                        <Typography>Mỗi
                            lần {getActivityTypeAction(activity.activity_type_id)}: {renderPoint(titleActivity.point[0])}</Typography>
                        {titleActivity.options.map((option, index) =>
                            <Typography key={index}>Nếu số
                                lần {getActivityTypeAction(activity.activity_type_id)} {markToString(option.type)}
                                <Text keyboard>{option.value}</Text> thì điểm {renderPoint(option.point)}</Typography>
                        )}
                    </>
                ),
                text: `[${activity.code}] ${activity.name}\nMỗi lần ${getActivityTypeAction(activity.activity_type_id)}: ${titleActivity.point[0]}\n${optionString}`,
            };
        }
        else if (activity.type === "POINT") {
            const optionString = titleActivity.options.map(option => `Nếu ${getActivityTypeAction(activity.activity_type_id)} số điểm ${markToString(option.type)} ${option.value} thì điểm ${renderRawPoint(option.point)}`).join("\n");
            return {
                html: (
                    <>
                        <Typography style={{fontWeight: "bold"}}>[{activity.code}] {activity.name}</Typography>
                        {titleActivity.options.map((option, index) =>
                            <Typography key={index}>Nếu {getActivityTypeAction(activity.activity_type_id)} số
                                điểm {markToString(option.type)} <Text keyboard>{option.value} điểm</Text> thì
                                điểm {renderPoint(option.point)}</Typography>
                        )}
                    </>
                ),
                text: `[${activity.code}] ${activity.name}\n${optionString}`,
            };
        }
        else if (activity.type === "ENUM") {
            const acceptString = activity.accepts.map((accept, index) => `${accept}: ${titleActivity.point[index] || 'Không'}`).join("\n");
            return {
                html: (
                    <>
                        <Typography style={{fontWeight: "bold"}}>[{activity.code}] {activity.name}</Typography>
                        {activity.accepts.map((accept, index) =>
                            <Typography
                                key={index}>{accept}: {renderPoint(titleActivity.point[index]) || 'Không'}</Typography>
                        )}
                    </>
                ),
                text: `[${activity.code}] ${activity.name}\n${acceptString}`,
            };
        }
        else return {
            html: <></>,
            text: '',
        };
    })
}