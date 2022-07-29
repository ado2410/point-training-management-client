import { saveSemesterDataService } from "./SemesterIO.services";
import { CellObject, CellStyle, utils as xlsxUtils, writeFile } from "xlsx-js-style";

interface SheetColumn {
    title: string,
    key: string,
    render?: (value: any) => string,
}

interface SemesterData {
    activities: any[],
    title_activities: any[],
    student_activities: any[],
}

export const getTableSheet = (columns: SheetColumn[], data: any[]) => {
    const headerCellStyle: CellStyle = {
        font: {
            name: "Times New Roman",
            sz: 11,
            bold: true,
        },
        border: {
            left: {style: "thin", color: {rgb: "000000"}},
            right: {style: "thin", color: {rgb: "000000"}},
            top: {style: "thin", color: {rgb: "000000"}},
            bottom: {style: "thin", color: {rgb: "000000"}},
        },
    }

    const cellStyle: CellStyle = {
        font: {
            name: "Times New Roman",
            sz: 11,
        },
        border: {
            left: {style: "thin", color: {rgb: "000000"}},
            right: {style: "thin", color: {rgb: "000000"}},
            top: {style: "thin", color: {rgb: "000000"}},
            bottom: {style: "thin", color: {rgb: "000000"}},
        },
    }

    const tableDataHeaders: CellObject[] = [{v: "STT", t: "s", s: headerCellStyle}];
    columns.forEach((column) => tableDataHeaders.push({v: column.title, t: "s", s: headerCellStyle}));

    const tableData: any[] = [tableDataHeaders];

    data.forEach((item, index) => {
        const row = [{v: index+1, t: "s", s: cellStyle}];
        columns.forEach((column) => {
            const value = column.render ? column.render(item[column.key]) : item[column.key];
            return row.push({v: value || '', t: "s", s: cellStyle});
        });
        tableData.push(row);
    });

    return tableData;
}

export const handleSaveData = async (semesterId: number | undefined) => {
    const semesterData:SemesterData = await saveSemesterDataService(semesterId);
    const workbook = xlsxUtils.book_new();

    const activityWorksheet = xlsxUtils.aoa_to_sheet(getTableSheet([
        {title: "Loại hoạt động", key: "activity_type_id"},
        {title: "Thuộc nhóm", key: "group"},
        {title: "Mã hoạt động", key: "code"},
        {title: "Tên hoạt động", key: "name"},
        {title: "Thời gian bắt đầu", key: "time_start"},
        {title: "Thời gian kết thúc", key: "time_end"},
        {title: "Địa điểm", key: "address"},
        {title: "Mô tả", key: "description"},
        {title: "Đơn vị tổ chức", key: "host"},
        {title: "Kiểu", key: "type"},
        {title: "Giá trị chấp nhận", key: "accepts", render: (value) => value?.toString() || ''},
        {title: "Giá trị mặc định", key: "default_value"},
    ], semesterData.activities));

    const studentActivityWorksheet = xlsxUtils.aoa_to_sheet(getTableSheet([
        {title: "Mã sinh viên", key: "student_code"},
        {title: "Mã hoạt động", key: "activity_code"},
        {title: "Giá trị", key: "value"},
    ], semesterData.student_activities));
    const titleActivityWorksheet = xlsxUtils.aoa_to_sheet(getTableSheet([
        {title: "Tiêu đề cấp 3", key: "third_title_id"},
        {title: "Mã hoạt động", key: "activity_code"},
        {title: "Điểm", key: "point", render: (value) => JSON.stringify(value) || ''},
        {title: "Tuỳ chỉnh", key: "options", render: (value) => JSON.stringify(value) || ''},
    ], semesterData.title_activities));
    xlsxUtils.book_append_sheet(workbook, activityWorksheet, "Hoạt động");
    xlsxUtils.book_append_sheet(workbook, studentActivityWorksheet, "Đánh giá sinh viên");
    xlsxUtils.book_append_sheet(workbook, titleActivityWorksheet, "Cấu hình đánh giá");
    writeFile(workbook, "Data.xlsx");
}