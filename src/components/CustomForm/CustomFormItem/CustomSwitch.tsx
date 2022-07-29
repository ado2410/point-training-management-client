import {Switch } from "antd";
import CustomFormItem from "./CustomFormItem";

const CustomSwitch: React.FC<CustomCheckProps> = (props: CustomCheckProps) => {
    const { defaultChecked, disabled } = props;

    return (
        <CustomFormItem
            {...props}
            component={<Switch defaultChecked={defaultChecked} disabled={disabled} />}
        />
    );
};

CustomSwitch.defaultProps = {
    defaultChecked: false,
};

export default CustomSwitch;
