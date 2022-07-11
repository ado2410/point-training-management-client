import { TableProps } from "antd";

interface FullHeightTableScroll {
    x: number | string | undefined;
    y: number | string | undefined;
}

type FullHeightTableProps = Omit<TableProps, 'scroll'> & {
    scroll?: FullHeightTableScroll;
}