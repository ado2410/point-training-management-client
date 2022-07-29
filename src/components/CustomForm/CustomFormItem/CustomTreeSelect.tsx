import { TreeSelect } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { TreeNode } from "antd/lib/tree-select";
import CustomFormItem from "./CustomFormItem";

const CustomTreeSelect: React.FC<CustomTreeSelectProps> = (props: CustomTreeSelectProps) => {
    const { disabled, multiple, showSearch, options } = props;

    const getFilterOption = (input: string, option: DefaultOptionType) => {
        return (option?.label?.toString())?.toLowerCase().includes(input.toLowerCase());
    };

    const renderTreeSelectItem = (options: CustomTreeSelectOption[] | undefined) =>
        options?.map((option, index) => (
            <TreeNode key={index} value={option.id} title={option.name} disabled={option.disabled || false}>
                {option.children ? (
                    renderTreeSelectItem(option.children)
                ) : (
                    <></>
                )}
            </TreeNode>
        ));

    return (
        <CustomFormItem
            {...props}
            component={
                <TreeSelect
                    multiple={multiple}
                    disabled={Boolean(disabled)}
                    showSearch={Boolean(showSearch)}
                    filterTreeNode={getFilterOption as unknown as boolean}
                >
                    {renderTreeSelectItem(options)}
                </TreeSelect>
            }
        />
    );
};

CustomTreeSelect.defaultProps = {
    disabled: false,
    multiple: false,
    options: [],
    showSearch: false,
};

export default CustomTreeSelect;
