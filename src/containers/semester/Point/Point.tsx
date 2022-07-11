import {Button, PageHeader, Space} from "antd";
import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Text from "antd/es/typography/Text";
import FullHeightTable from "../../../components/FullHeightTable/FullHeightTable";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import TimesNewRomanNormal from "../../../fonts/TimesNewRomanNormal";
import TimesNewRomanBold from "../../../fonts/TimesNewRomanBold";
import TimesNewRomanItalic from "../../../fonts/TimesNewRomanItalic";
import TimesNewRomanBoldItalic from "../../../fonts/TimesNewRomanBoldItalic";
import { flattenTitles } from "../Configuration/Configuration.actions";
import { getDescription, getReason } from "./Point.actions";
import { getPointDataService } from "./Point.services";
import { pointTableColumns } from "./Point.constants";
import "../../../styles/styles.css";

const Point: React.FC<PointProps> = (props: PointProps) => {
    const [searchParams] = useSearchParams();
    const {semesterId} = props;
    const studentId = searchParams.get("student") || undefined;
    const [data, setData] = useState<ServerListData<PointThirdTitle>>({
        data: [],
    });
    const [student, setStudent] = useState<Student>();
    const [semester, setSemester] = useState<Semester>();

    const getData = useCallback(async () => {
        const newData = (await getPointDataService(semesterId, studentId));
        const flattenData = flattenTitles(newData.data) as unknown as PointThirdTitle[];
        let maxPointSum = 0;
        let pointSum = 0;
        flattenData.forEach(title => {
            if (title.type === "third") {
                pointSum += title.point;
                maxPointSum += title.max_point;
                title.reason = getReason(title) || [];
                title.description = getDescription(title) || [];
            }
        });

        flattenData.push({
            type: "sum",
            title: "Tổng cộng",
            point: pointSum,
            max_point: maxPointSum,
            id: 0,
            secondary_title_id: 0,
            order: 0,
            default_point: 0,
            created_at: "",
            updated_at: "",
            delete: [],
            description: [],
            reason: []
        });
        data.data = flattenData;
        setStudent(newData.student);
        setSemester(newData.semester);
        setData({...data});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesterId, studentId]);

    useEffect(() => {
        (async () => await getData())();
    }, [getData]);

    //Xuất file pdf
    const handlePrint = async () => {
        const doc = new jsPDF({
            orientation: "p",
            unit: "cm",
            format: "a4",
        }) as any;

        doc.addFileToVFS('TimesNewRomanNormal.ttf', TimesNewRomanNormal);
        doc.addFileToVFS('TimesNewRomanBold.ttf', TimesNewRomanBold);
        doc.addFileToVFS('TimesNewRomanItalic.ttf', TimesNewRomanItalic);
        doc.addFileToVFS('TimesNewRomanBolditalic.ttf', TimesNewRomanBoldItalic);
        doc.addFont('TimesNewRomanNormal.ttf', 'Times New Roman', 'normal');
        doc.addFont('TimesNewRomanBold.ttf', 'Times New Roman', 'bold');
        doc.addFont('TimesNewRomanItalic.ttf', 'Times New Roman', 'italic');
        doc.addFont('TimesNewRomanBolditalic.ttf', 'Times New Roman', 'bolditalic');

        doc.setFont("Times New Roman", "normal");
        doc.setFontSize(12);
        doc.text(5, 1, "ĐẠI HỌC ĐÀ NẴNG", {align: "center"});

        doc.setFont("Times New Roman", "bold");
        doc.text(5, 1.6, "PHÂN HIỆU ĐHĐN TẠI KON TUM", {align: "center"});
        doc.setLineWidth(0.025);
        doc.line(3, 1.8, 7, 1.8);

        doc.text(15, 1, "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", {align: "center"});
        doc.text(15, 1.6, "Độc lập - Tự do - Hạnh phúc", {align: "center"});
        doc.line(13, 1.8, 17, 1.8);

        doc.setFont("Times New Roman", "bold");
        doc.setFontSize(13);
        doc.text(10, 2.6, "PHIẾU ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN CỦA SINH VIÊN", {align: "center"});
        doc.text(10, 3.2, `HỌC KỲ ${semester?.name} NĂM HỌC ${semester?.year?.name}`, {align: "center"});

        doc.setFont("Times New Roman", "normal");
        doc.setFontSize(12);

        doc.text(2, 4, `Họ và tên sinh viên: ${student?.user?.first_name}  ${student?.user?.last_name}`);
        doc.text(10, 4, `Mã số sinh viên: ${student?.student_code}`);
        doc.text(2, 4.6, `Lớp : ${student?.class?.name}`);
        doc.text(6, 4.6, `Khóa : ${student?.class?.name?.substring(0, 3)}`);
        doc.text(10, 4.6, `Khoa : ${student?.class?.major?.department?.name}`);

        const columns = [
            {header: "Nội dung và tiêu chí đánh giá", dataKey: "title"},
            {header: "Khung điểm", dataKey: "max_point"},
            {header: "Điểm", dataKey: "point"},
            {header: "Lý do cộng điểm", dataKey: "reason"},
            {header: "Mô tả", dataKey: "description"},
        ];

        const body = data.data.map(titleActivity => {
            let reasonText = '';
            if (titleActivity.type === "third") {
                if (titleActivity.reason.length > 0)
                    titleActivity.reason.forEach(reason => reasonText += `${reason.text}\n`);
                else reasonText = "Không có mục cộng điểm, cộng tối đa";
            }

            let descriptionText = '';
            if (titleActivity.type === "third") {
                if (titleActivity.description.length > 0)
                    titleActivity.description.forEach(description => descriptionText += `${description.text}\n`);
                else descriptionText = "Không có mục cộng điểm";
            }

            const row = {
                title: titleActivity.title,
                max_point: titleActivity.max_point || '',
                point: titleActivity.point || '',
                reason: reasonText,
                description: descriptionText,
            };
            return row;
        });

        doc.autoTable(
            columns.filter(column => ["title", "max_point", "point", "reason"].includes(column.dataKey)),
            body,
            {
                startY: 5,
                columnWidth: 'wrap',
                columnStyles: {
                    title: {cellWidth: 8, valign: "middle"},
                    max_point: {cellWidth: 2, halign: "center", valign: "middle"},
                    point: {cellWidth: 2, halign: "center", valign: "middle"},
                    reason: {cellWidth: 6, valign: "middle"},
                },
                headStyles: { halign: "center" },
                styles: {
                    font: "Times New Roman",
                    fontStyle: 'normal',
                    fontSize: 12,
                }
            },
        );

        doc.addPage();
        doc.text(10, 2, "HƯỚNG DẪN CỘNG ĐIỂM", {align: "center"});
        doc.autoTable(
            columns.filter(column => ["title", "description"].includes(column.dataKey)),
            body,
            {
                startY: 3,
                columnWidth: 'wrap',
                columnStyles: {
                    title: {cellWidth: 10, valign: "middle"},
                    description: {cellWidth: 8, valign: "middle"},
                },
                headStyles: { halign: "center" },
                styles: {
                    font: "Times New Roman",
                    fontStyle: 'normal',
                    fontSize: 12,
                }
            },
        );

        var string = doc.output('datauristring');
        var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
        var x = window.open();
        x?.document.open();
        x?.document.write(embed);
        x?.document.close();
    }

    return (
        <>
            <PageHeader
                className="page-header"
                title="Đánh giá kết quả rèn luyện của sinh viên"
                extra={<Button onClick={handlePrint}>In phiếu</Button>}
            >
                <Space direction="vertical">
                    <Space size="large">
                        <Text>Họ và tên: {student?.user?.first_name} {student?.user?.last_name}</Text>
                        <Text>MSSV: {student?.student_code}</Text>
                    </Space>
                    <Space size="large">
                        <Text>Lớp: {student?.class?.name}</Text>
                        <Text>Khóa: {student?.class?.name?.substring(0, 3)}</Text>
                        <Text>Khoa: {student?.class?.major?.department?.name}</Text>
                    </Space>
                </Space>
            </PageHeader>
            <FullHeightTable columns={pointTableColumns} dataSource={data?.data} pagination={false} sticky bordered/>
        </>
    );
}

Point.defaultProps = {
    semesterId: 0,
}

export default Point;