import { Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import CustomFormItem from "./CustomFormItem";

const CustomSelect: React.FC<CustomSelectProps> = (props: CustomSelectProps) => {
    const { disabled, multiple, showSearch, options } = props;

    const getFilterOption = (input: string, option: DefaultOptionType) => {
        return (option?.children as unknown as string)
            ?.toLowerCase()
            .includes(input.toLowerCase());
    };

    return (
        <CustomFormItem
            {...props}
            component={
                <Select
                    mode={multiple ? "multiple" : undefined}
                    disabled={Boolean(disabled)}
                    showSearch={Boolean(showSearch)}
                    filterOption={getFilterOption as unknown as boolean}
                >
                    {options?.map(
                        (option, index) => (
                            <Select.Option key={index} value={option.id}>
                                {option.name}
                            </Select.Option>
                        )
                    )}
                </Select>
            }
        />
    );
};

CustomSelect.defaultProps = {
    disabled: false,
    multiple: false,
    options: [],
    showSearch: false,
};

export default CustomSelect;
