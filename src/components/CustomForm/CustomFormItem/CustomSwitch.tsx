import {Switch } from "antd";
import CustomFormItem from "./CustomFormItem";

const CustomSwitch: React.FC<CustomCheckProps> = (props: CustomCheckProps) => {
    const { defaultChecked } = props;

    return (
        <CustomFormItem
            {...props}
            component={<Switch defaultChecked={defaultChecked} />}
        />
    );
};

CustomSwitch.defaultProps = {
    defaultChecked: false,
};

export default CustomSwitch;
