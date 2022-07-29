import { Button, Space, Tooltip, TableColumnType } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FullHeightTable from "../FullHeightTable/FullHeightTable";
import { useState } from "react";
import { callOrVar } from "../../utils/other";

interface ListProps {
    buttons?: (record: any, index: number) => React.ReactNode[] | React.ReactNode[] | JSX.Element,
    columns: TableColumnType<any>[],
    data: any[],
    onUpdate?: (record: any, index: number) => void;
    onDelete?: (record: any, index: number) => void;
    onCopy?: (record: any, index: number) => void;
    canCopy?: ((record: any, index: number) => boolean) | boolean;
    canEdit?: ((record: any, index: number) => boolean) | boolean;
    canDelete?: ((record: any, index: number) => boolean) | boolean;
    tableProps?: Record<string, any>;
}

const List: React.FC<ListProps> = (props: ListProps) => {
    const {columns, data, buttons, canCopy, canEdit, canDelete, onCopy, onUpdate, onDelete, tableProps} = props;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    const renderAction = (_text: string, record: any, index: number) => {
        index = (page - 1) * pageSize + index;
        return (
            <Space>
                {typeof buttons === "function"
                    ? buttons(record, index)
                    : buttons}
                {callOrVar(canCopy, [record, index]) && (
                    <Tooltip title="Sao chép">
                        <Button
                            type="primary"
                            icon={<CopyOutlined />}
                            onClick={() => onCopy!(record, index)}
                        />
                    </Tooltip>
                )}
                {callOrVar(canEdit, [record, index]) && (
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => onUpdate!(record, index)}
                        />
                    </Tooltip>
                )}
                {callOrVar(canDelete, [record, index]) && (
                    <Tooltip title="Xoá">
                        <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => onDelete!(record, index)}
                        />
                    </Tooltip>
                )}
            </Space>
        );
    }

    const fullColumns = [
        {
            title: "STT",
            width: 70,
            align: "center",
            render: (_text: string, _record: any, index: number) => {
                index = (page - 1) * pageSize + index;
                return index + 1;
            },
        },
        ...columns,
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            align: "center",
            width: 150,
            render: renderAction
        },
    ];

    return (
            <FullHeightTable
            {...tableProps}
            dataSource={data}
            columns={fullColumns}
            pagination={{
                defaultPageSize: 20,
                ...tableProps,
                onChange: (currentPage: number, currentPageSize: number) => {
                    setPage(currentPage || page);
                    setPageSize(currentPageSize || pageSize);
                },
            }}
        />
    );
}

List.defaultProps = {
    columns: [],
    data: [],
    buttons: undefined,
    onUpdate: () => {},
    onDelete: () => {},
    onCopy: () => {},
    canCopy: false,
    canEdit: false,
    canDelete: false,
    tableProps: {},
};

export default List;