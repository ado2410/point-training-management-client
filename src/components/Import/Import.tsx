import { useEffect, useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import { read, WorkBook, WorkSheet } from "xlsx";
import Text from "antd/es/typography/Text";
import "./Import.css";
import CustomDragger from "../CustomDragger/CustomDragger";
import { EyeOutlined } from "@ant-design/icons";

enum Step {
    IMPORT,
    PREVIEW,
}

const getCellValue = (worksheet: WorkSheet, col: string, row: number) => {
    return worksheet[`${col}${row}`]?.v;
};

// Lấy vị trí các hàng trong file
const getRow = (worksheet: WorkSheet) => {
    let dropRows: number[] = [];
    let rowIndex: number = 1;

    //Tìm hàng đầu tiên
    while (!Number.isInteger(getCellValue(worksheet, "A", rowIndex)))
        rowIndex++;

    let endRow = rowIndex;
    while (true) {
        const cellValue = getCellValue(worksheet, "A", endRow);
        const nextCellValue = getCellValue(worksheet, "A", endRow + 1);
        if (!Number.isInteger(cellValue) && !Number.isInteger(nextCellValue)) break;
        if (!Number.isInteger(cellValue)) dropRows.push(endRow);
        endRow++;
    }
    return { start: rowIndex, end: endRow - 1, drop: dropRows };
};

const Import: React.FC<ImportProps> = (props: ImportProps) => {
    const {columns, errors, options, scroll, onImport} = props;
    const [step, setStep] = useState(Step.IMPORT);
    const [workbook, setWorkbook] = useState<WorkBook>();
    const [rawData, setRawData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [previewPage, setPreviewPage] = useState<number>(1);
    const [previewPageSize, setPreviewPageSize] = useState<number>(20);

    useEffect(() => {
        if (step === Step.PREVIEW) previewFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, previewPage, previewPageSize]);

    const importFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const loadedWorkbook = read(e?.target?.result, { type: "binary" });
            setWorkbook(loadedWorkbook);
        };
        reader.readAsBinaryString(file);
    };

    const previewFile = () => {
        if (!workbook) return;

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rowDetection = getRow(worksheet);
        const rawRows: Record<string, any>[] = [];
        const rows: Record<string, any>[] = [];

        //Duyệt từng hàng trong workbook
        for (let index = rowDetection.start; index <= rowDetection.end; index++) {
            const rawRow: Record<string, any> = {};
            const row: Record<string, any> = {};
            
            //Lấy từng cột
            for (const column of columns!) {
                const {columnIndex, value: columnValue, parser} = column;
                let value: any;

                //Nếu có columnIndex
                if (columnIndex) {
                    value = getCellValue(worksheet, columnIndex, index);
                    rawRow[column.key] = value;
                }

                //Nếu có parser
                if (parser) {
                    const convertOptions = options![parser];
                    value = convertOptions.find((option) => option.name === value)?.id || 0;
                }

                //Nếu có value
                if (columnValue) {
                    if (typeof columnValue === "function") value = columnValue(value, options);
                    else value = columnValue;
                }

                //Render
                column.render = (text, _record, index) => (
                    <>
                        <Typography key={index}>{text}</Typography>
                        {errors!
                            .filter(
                                (error) =>
                                    error.key === column.key &&
                                    error.index === index + ((previewPage! - 1) * previewPageSize!)
                            )
                            .map((error, i) => (
                                <Typography key={i}>
                                    <Text type="danger" italic>
                                        {error.message}
                                    </Text>
                                </Typography>
                            ))}
                    </>
                );
                row[column.key] = value;
            }
            rawRows.push(rawRow);
            rows.push(row);
        }

        setRawData(rawRows);
        setData(rows);
        setStep(Step.PREVIEW);
    };

    const insertFile = () => {
        onImport!(data);
    };

    //Step là import
    if (step === Step.IMPORT)
        return (
            <Space
                direction="vertical"
                style={{ width: "100%", alignItems: "center" }}
            >
                <CustomDragger onUpload={importFile} />
                <Button
                    type="primary"
                    onClick={previewFile}
                    icon={<EyeOutlined />}
                >
                    Xem trước
                </Button>
            </Space>
        );
    //Step là preview
    else if (step === Step.PREVIEW) {
        const previewColumns: any[] = [
            {
                title: "STT",
                key: "",
                dataIndex: "",
                columnIndex: "",
                align: "center",
                width: 70,
                render: (_text: string, _record: any, index: number) =>
                    index + ((previewPage! - 1) * previewPageSize!) + 1
            },
            ...columns! as any,
        ].filter((column) => !column.hidden);
        return (
            <Space
                direction="vertical"
                style={{ width: "100%", alignItems: "center" }}
            >
                <Table
                    pagination={{defaultPageSize: 20}}
                    sticky
                    columns={previewColumns}
                    dataSource={rawData}
                    scroll={scroll}
                    onChange={(pagination) => {
                        setPreviewPage(pagination.current || 1);
                        setPreviewPageSize(pagination.pageSize || 20);
                    }}
                    size="small"
                />
                <Space>
                    <Button onClick={() => setStep(Step.IMPORT)}>
                        Quay lại
                    </Button>
                    <Button type="primary" onClick={insertFile}>
                        Nhập
                    </Button>
                </Space>
            </Space>
        );
    } else return <>Bước này không có!</>;
};

export default Import;

Import.defaultProps = {
    columns: [],
    errors: [],
    options: {},
    scroll: { y: "calc(100vh - 320px)" },
    onImport: () => {},
};
