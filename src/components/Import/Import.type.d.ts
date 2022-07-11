interface ImportColumn<T> {
    title?: string;
    key: string;
    dataIndex?: string;
    columnIndex?: string;
    hidden?: Boolean;
    width?: number;
    value?: ((text: string, options: Record<string, ImportOption[]> | undefined) => any) | any;
    parser?: string,
    render?: (text: string, record: T, index: number) => void;
}

interface ImportError {
    key: string;
    index: number;
    message: string;
}

interface ImportOption {
    id: number;
    name: string;
}

interface ImportScroll {
    x?: number | string;
    y?: number | string;
}

interface ImportProps {
    columns?: ImportColumn<any>[];
    errors?: ImportError[];
    options?: Record<string, ImportOption[]>;
    scroll?: ImportScroll;
    onImport?: (data: any[]) => void;
}