import {
    Card,
    Col,
    Row,
    Segmented,
    Space,
    Typography,
} from "antd";
import {
    PieChartOutlined,
    TableOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import FullHeightTable from "../../../components/FullHeightTable/FullHeightTable";
import { Bar } from "@ant-design/plots";
import { sumByKey } from "../../../utils/array";
import { getSemesterDashboardService } from "./DashboardCount.services";

interface DashboardCountData {
    name: string;
    student_count: number | string;
    male_student_count: number | string;
    female_student_count: number | string;
    grade1_count: number | string;
    grade2_count: number | string;
    grade3_count: number | string;
    grade4_count: number | string;
    grade5_count: number | string;
    grade6_count: number | string;
}

interface SemesterDashboard {
    data: DashboardCountData[];
}

interface DashboardCountProps {
    semesterId: number;
    height?: any;
}

enum SegmentedType {
    DEPARTMENT, MAJOR, KEY, CLASS
};

enum StructType {
    TABLE, CHART
};

enum DisplayType {
    NUMBER, PERCENT
};

const DashboardCount: React.FC<DashboardCountProps> = (props: DashboardCountProps) => {
    const { semesterId, height } = props;
    const [semesterDashboard, setSemesterDashboard] = useState<SemesterDashboard>();
    const [segmentedType, setSegmentedType] = useState(
        SegmentedType.DEPARTMENT
    );
    const [structType, setStructType] = useState<StructType>(StructType.CHART);
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.NUMBER);

    useEffect(() => {
        (async () => {
            setSemesterDashboard(await getSemesterDashboardService(semesterId));
        })();
    }, [semesterId]);

    const studentDataColumns = [
        {
            title: "Lớp",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng sinh viên",
            children: [
                {
                    title: "Tổng số",
                    dataIndex: "student_count",
                    key: "student_count",
                },
                {
                    title: "Nam",
                    dataIndex: "male_student_count",
                    key: "male_student_count",
                },
                {
                    title: "Nữ",
                    dataIndex: "female_student_count",
                    key: "female_student_count",
                },
            ],
        },
        {
            title: "Điểm rèn luyện",
            children: [
                {
                    title: "Xuất sắc",
                    dataIndex: "grade1_count",
                    key: "grade1_count",
                },
                {
                    title: "Tốt",
                    dataIndex: "grade2_count",
                    key: "grade2_count",
                },
                {
                    title: "Khá",
                    dataIndex: "grade3_count",
                    key: "grade3_count",
                },
                {
                    title: "Trung bình",
                    dataIndex: "grade4_count",
                    key: "grade4_count",
                },
                {
                    title: "Yếu",
                    dataIndex: "grade5_count",
                    key: "grade5_count",
                },
                {
                    title: "Kém",
                    dataIndex: "grade6_count",
                    key: "grade6_count",
                },
            ],
        },
    ];

    const getSegmentedSumData = (key: { label: string; dataIndex: string; }) => {
        return sumByKey(
            semesterDashboard?.data || [],
            key,
            [
                "student_count",
                "male_student_count",
                "female_student_count",
                "grade1_count",
                "grade2_count",
                "grade3_count",
                "grade4_count",
                "grade5_count",
                "grade6_count",
            ]
        );
    }

    const getSegmentedData = () => {
        switch (segmentedType) {
            case SegmentedType.DEPARTMENT:
                return getSegmentedSumData({label: "name", dataIndex: "department_name"}) || [];
            case SegmentedType.MAJOR:
                return getSegmentedSumData({label: "name", dataIndex: "major_name"}) || [];
            case SegmentedType.KEY:
                return getSegmentedSumData({label: "name", dataIndex: "key_name"}) || [];
            case SegmentedType.CLASS:
                return getSegmentedSumData({label: "name", dataIndex: "class_name"}) || [];
            default:
                return [];
        }
    };

    const getSegmentedDataFluid = () => {
        let data = getSegmentedData();
        if (displayType === DisplayType.PERCENT) {
            data = data.map((item) => {
                const newItem: DashboardCountData = {
                    name: item.name,
                    student_count: "100%",
                    male_student_count: `${( (item.male_student_count / item.student_count) * 100).toFixed(1)}%`,
                    female_student_count: `${( (item.female_student_count / item.student_count) * 100).toFixed(1)}%`,
                    grade1_count: `${((item.grade1_count / item.student_count) * 100).toFixed(1)}%`,
                    grade2_count: `${((item.grade2_count / item.student_count) * 100).toFixed(1)}%`,
                    grade3_count: `${((item.grade3_count / item.student_count) * 100).toFixed(1)}%`,
                    grade4_count: `${((item.grade4_count / item.student_count) * 100).toFixed(1)}%`,
                    grade5_count: `${((item.grade5_count / item.student_count) * 100).toFixed(1)}%`,
                    grade6_count: `${((item.grade6_count / item.student_count) * 100).toFixed(1)}%`,
                }
                return newItem;
            });
        }
        return data;
    };

    const getChartData = (columns: any[]) => {
        let source = getSegmentedData() || [];

        let data: any[] = [];
        columns.forEach((column) => {
            data = data.concat(
                source.map((item) => ({
                    name: item.name,
                    type: column.label,
                    value: item[column.dataIndex],
                }))
            );
        });

        return data;
    };

    const getChartAnnotations = (content: any) => {
        let source = getSegmentedData() || [];
        let annotations: any[] = [];
        source.forEach((item, index) =>
            annotations.push({
                type: "text",
                position: [index, item.student_count],
                content: content(item),
                offsetX: 10,
            })
        );
        return annotations;
    };

    const getStudentConfig = () => {
        return {
            data: getChartData([
                {
                    label: "Nam",
                    dataIndex: "male_student_count",
                },
                {
                    label: "Nữ",
                    dataIndex: "female_student_count",
                },
            ]),
            yField: "name",
            xField: "value",
            seriesField: "type",
            isStack: true,
            isPercent: displayType === DisplayType.PERCENT,
            annotations: getChartAnnotations((item: { student_count: any; }) => item.student_count),
        };
    };

    const getPointConfig = () => {
        return {
            data: getChartData([
                {
                    label: "Kém",
                    dataIndex: "grade6_count",
                },
                {
                    label: "Yếu",
                    dataIndex: "grade5_count",
                },
                {
                    label: "Trung bình",
                    dataIndex: "grade4_count",
                },
                {
                    label: "Khá",
                    dataIndex: "grade3_count",
                },
                {
                    label: "Tốt",
                    dataIndex: "grade2_count",
                },
                {
                    label: "Xuất sắc",
                    dataIndex: "grade1_count",
                },
            ]),
            yField: "name",
            xField: "value",
            seriesField: "type",
            isStack: true,
            isPercent: displayType === DisplayType.PERCENT,
            annotations: getChartAnnotations((item: { student_count: any; }) => item.student_count),
        };
    };
    return (
        <>
            <Space
                size="large"
                style={{ width: "100%"}}
            >
                <Segmented
                    options={[
                        {
                            label: <PieChartOutlined />,
                            value: StructType.CHART,
                        },
                        {
                            label: <TableOutlined />,
                            value: StructType.TABLE,
                        },
                    ]}
                    defaultValue={structType}
                    onChange={(value: any) => setStructType(value)}
                />
                <Segmented
                    options={[
                        {
                            label: "N",
                            value: DisplayType.NUMBER,
                        },
                        {
                            label: "%",
                            value: DisplayType.PERCENT,
                        },
                    ]}
                    defaultValue={displayType}
                    onChange={(value: any) => setDisplayType(value)}
                />
                <Segmented
                    options={[
                        {
                            label: "Khoa",
                            value: SegmentedType.DEPARTMENT,
                        },
                        {
                            label: "Khóa",
                            value: SegmentedType.KEY,
                        },
                        {
                            label: "Ngành",
                            value: SegmentedType.MAJOR,
                        },
                        {
                            label: "Lớp",
                            value: SegmentedType.CLASS,
                        },
                    ]}
                    defaultValue={segmentedType}
                    onChange={(value: any) => setSegmentedType(value)}
                />
            </Space>
            <Card style={{paddingBottom: 5}}>
                {structType === StructType.CHART && (
                    <Row
                        style={{ width: "100%"}}
                        gutter={[32, 16]}
                    >
                        <Col
                            span={12}
                            style={{ paddingLeft: 0, height: height}}
                        >
                            <Typography style={{textAlign: "center", marginBottom: 5}}>Số lượng sinh viên</Typography>
                            <Bar {...getStudentConfig()} />
                        </Col>
                        <Col
                            span={12}
                            style={{ paddingRight: 0, height: height }}
                        >
                            <Typography style={{textAlign: "center", marginBottom: 5}}>Điểm rèn luyện</Typography>
                            <Bar {...getPointConfig()} />
                        </Col>
                    </Row>
                )}

                {structType === StructType.TABLE && (
                    <FullHeightTable
                        bordered
                        columns={studentDataColumns}
                        dataSource={getSegmentedDataFluid()}
                        scroll={{ x: "100%", y: height }}
                        pagination={false}
                    />
                )}
            </Card>
        </>
    );
}

DashboardCount.defaultProps = {
    semesterId: 0,
    height: "calc(100vh - 265px)",
};

export default DashboardCount;
