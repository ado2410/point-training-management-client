import { Form } from "antd";

const CustomFormItem: React.FC<CustomFormItemProps> = (props: CustomFormItemProps) => {
    const { label, name, initialValue, validateStatus, help, component, style } = props;

    return (
        <Form.Item
            style={style}
            label={label}
            name={name}
            initialValue={initialValue}
            validateStatus={validateStatus}
            help={help}
        >
            {component}
        </Form.Item>
    );
};

CustomFormItem.defaultProps = {
    label: "",
    name: "",
    initialValue: undefined,
    validateStatus: "",
    help: "",
    component: <></>
};

export default CustomFormItem;
