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
import { UserOptions } from "jspdf-autotable";

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
            title: "TỔNG CỘNG",
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
        doc.setProperties({ title: 'Phiếu đánh giá điểm rèn luyện' });

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
        doc.text(5, 2, "ĐẠI HỌC ĐÀ NẴNG", {align: "center"});

        doc.setFont("Times New Roman", "bold");
        doc.text(5, 2.6, "PHÂN HIỆU ĐHĐN TẠI KON TUM", {align: "center"});
        doc.setLineWidth(0.025);
        doc.line(3, 2.8, 7, 2.8);

        doc.text(15, 2, "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", {align: "center"});
        doc.text(15, 2.6, "Độc lập - Tự do - Hạnh phúc", {align: "center"});
        doc.line(13, 2.8, 17, 2.8);

        doc.setFont("Times New Roman", "bold");
        doc.setFontSize(13);
        doc.text(10, 3.6, "PHIẾU ĐÁNH GIÁ KẾT QUẢ RÈN LUYỆN CỦA SINH VIÊN", {align: "center"});
        doc.text(10, 4.2, `HỌC KỲ ${semester?.name} NĂM HỌC ${semester?.year?.name}`, {align: "center"});

        doc.setFont("Times New Roman", "normal");
        doc.setFontSize(12);

        doc.text(2, 5, `Họ và tên sinh viên: ${student?.user?.first_name}  ${student?.user?.last_name}`);
        doc.text(12, 5, `Mã số sinh viên: ${student?.student_code}`);
        doc.text(2, 5.6, `Lớp : ${student?.class?.name}`);
        doc.text(6, 5.6, `Khóa : ${student?.class?.name?.substring(0, 3)}`);
        doc.text(10, 5.6, `Khoa : ${student?.class?.major?.department?.name}`);

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
                type: titleActivity.type,
                title: titleActivity.title,
                max_point: titleActivity.max_point || '',
                point: titleActivity.point || '',
                reason: reasonText,
                description: descriptionText,
            };
            return row;
        });

        const tableSettings = {
            theme: "grid",
            bodyStyles: {lineColor: [0, 0, 0], lineWidth: 0.01, textColor: [0, 0, 0]},
            startY: 6,
            columnWidth: 'wrap',
            columnStyles: {
                title: {cellWidth: 8, halign: "justify", valign: "middle"},
                max_point: {cellWidth: 2, halign: "center", valign: "middle"},
                point: {cellWidth: 2, halign: "center", valign: "middle"},
                reason: {cellWidth: 6, halign: "justify", valign: "middle"},
            },
            headStyles: { halign: "center", lineColor: [0, 0, 0], lineWidth: 0.01, fillColor: [255, 255, 255], textColor: [0, 0, 0]},
            styles: {
                font: "Times New Roman",
                fontStyle: 'normal',
                fontSize: 12,
            },
            didParseCell: (data) => {
                const row = data.row.raw as any;
                if (row.type !== 'third') data.cell.styles.fontStyle = "bold";
            },
        } as UserOptions;

        doc.autoTable(
            columns.filter(column => ["title", "max_point", "point", "reason"].includes(column.dataKey)),
            body,
            tableSettings,
        );

        const guideTableSettings = {
            theme: "grid",
            bodyStyles: {lineColor: [0, 0, 0], lineWidth: 0.01, textColor: [0, 0, 0]},
            startY: 2.5,
            columnWidth: 'wrap',
            columnStyles: {
                title: {cellWidth: 10, halign: "justify", valign: "middle"},
                description: {cellWidth: 8, halign: "justify", valign: "middle"},
            },
            headStyles: { halign: "center", lineColor: [0, 0, 0], lineWidth: 0.01, fillColor: [255, 255, 255], textColor: [0, 0, 0]},
            styles: {
                font: "Times New Roman",
                fontStyle: 'normal',
                fontSize: 12,
            },
            didParseCell: (data) => {
                const row = data.row.raw as any;
                if (row.type !== 'third') data.cell.styles.fontStyle = "bold";
            },
        } as UserOptions;

        doc.setFont("Times New Roman", "bold");
        doc.addPage();
        doc.text(10, 2, "HƯỚNG DẪN CỘNG ĐIỂM", {align: "center"});
        doc.autoTable(
            columns.filter(column => ["title", "description"].includes(column.dataKey)),
            body,
            guideTableSettings,
        );
        doc.setFont("Times New Roman", "normal");

        doc.output('dataurlnewwindow', {filename: "Phiếu đánh giá điểm rèn luyện"});
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
                        <Text>Điểm rèn luyện: {data?.data[data?.data.length - 1]?.point}</Text>
                    </Space>
                </Space>
            </PageHeader>
            <FullHeightTable
                columns={pointTableColumns}
                dataSource={data?.data}
                pagination={false}
                sticky
                bordered
                scroll={{y: 'calc(100vh - 325px)'}}
            />
        </>
    );
}

Point.defaultProps = {
    semesterId: 0,
}

export default Point;