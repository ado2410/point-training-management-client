//Types
interface CustomFormField<T> {
    label: ((values: T) => React.ReactNode) | React.ReactNode;
    name: ((values: T) => string) | string;
    type?: ((values: T) => "divider"| "input" | "select" | "treeselect" | "date" | "datetime" | "switch" | "hidden") | "divider"| "input" | "select" | "treeselect" | "date" | "datetime" | "switch" | "hidden";
    inputType?: ((values: T) => string) | string;
    dataIndex?: ((values: T) => string[] | string) | (string[] | string);
    initialValue?: ((values: T) => string | number | null | string[] | number[] | boolean) | string | number | null | string[] | number[] | boolean;
    multiple?: ((values: T) => boolean) | boolean;
    showSearch?: ((values: T) => boolean) | boolean;
    disabled?: ((values: T) => boolean) | boolean;
    options?: ((values: T, options: Record<string, CustomSelectOption[]>) => CustomSelectOption[]) | CustomSelectOption[] | string;
    hide?: ((values: T) => Boolean) | Boolean;
    component?: ((values: T) => React.ReactNode) | React.ReactNode;
    validateStatus?: ((values: T) => "" | "success" | "warning" | "error" | "validating" | undefined) | ("" | "success" | "warning" | "error" | "validating" | undefined);
    help?: ((values: T) => React.ReactNode) | React.ReactNode;
}

interface CustomFormCol {
    label: number;
    wrapper: number;
}

interface CustomSelectOption {
    id: string | number;
    name: string;
}

interface CustomTreeSelectOption {
    id: string | number;
    name: string;
    disabled?: boolean;
    children: CustomTreeSelectOption[];
}

//Props
interface CustomFormProps {
    initialValues?: Record<string, any>;
    fields?: CustomFormField[];
    errors?: Record<string, string>;
    col?: CustomFormCol;
    hideSubmitButton?: Boolean;
    submitLabel?: string;
    layout?: "horizontal" | "vertical" | "inline";
    onValuesChange?: (allValues: any) => void;
    onFinish?: (values: any) => void;
    options?: Record<string, CustomSelectOption[]>;
}

interface CustomFormItemProps {
    style?: React.CSSProperties | undefined;
    label: React.ReactNode;
    name: string;
    initialValue?: any;
    validateStatus?: "" | "success" | "warning" | "error" | "validating" | undefined;
    help?: React.ReactNode;
    component: React.ReactNode;
}

type CustomBaseProps = Omit<CustomFormItemProps, 'component'> & {
    disabled?: boolean;
}

type CustomInputProps = CustomBaseProps & {
    type?: any;
}

type CustomSelectProps = CustomBaseProps & {
    multiple?: boolean;
    options?: CustomSelectOption[];
    showSearch?: boolean;
};

type CustomTreeSelectProps = CustomBaseProps & {
    multiple?: boolean;
    options?: CustomTreeSelectOption[];
    showSearch?: boolean;
}

type CustomDatePickerProps = CustomBaseProps & {
    showTime?: boolean;
};
type CustomDateTimePickerProps = CustomBaseProps & {};

type CustomCheckProps = CustomBaseProps & {
    defaultChecked?: boolean;
};