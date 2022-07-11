import { Input } from "antd";
import CustomFormItem from "./CustomFormItem";

const CustomInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {
    const { disabled, type } = props;

    return (
        <CustomFormItem
            {...props}
            component={<Input disabled={disabled === true} type={type} />}
        />
    );
};

CustomInput.defaultProps = {
    type: "text",
};

export default CustomInput;
