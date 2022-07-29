interface IndexProps {
    route: string;
    name: string;
    params: any;
    buttons: React.ReactNode[] | JSX.Element;
    listButtons: (record: any, index: number) => React.ReactNode[] | React.ReactNode[] | JSX.Element;
    columns: any[];
    importColumns: ImportColumn<any>[];
    routes: CustomBreadCrumbRoute[];
    preInsert?: (values: any) => any;
    preUpdate?: (values: any) => any;
    preCopy?: (values: any) => any;
    createFields?: CustomFormField<any>[];
    editFields?: CustomFormField<any>[];
    copyFields?: CustomFormField<any>[];
    canCreate?: boolean;
    canCopy?: ((record: any, index: number) => boolean) | boolean;
    canEdit?: ((record: any, index: number) => boolean) | boolean;
    canDelete?: ((record: any, index: number) => boolean) | boolean;
    onChange: () => void;
    filterData?: (item: any) => boolean;
    tableProps?: Record<string, any>;
}