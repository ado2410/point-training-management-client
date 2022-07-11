import { DatePicker } from "antd";
import CustomFormItem from "./CustomFormItem";

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props: CustomDatePickerProps) => {
    const { disabled, showTime } = props;

    return (
        <CustomFormItem
            {...props}
            component={
                <DatePicker
                    showTime={showTime ? { format: 'HH:mm' } : false}
                    style={{width: '100%'}}
                    disabled={disabled === true}
                    format={showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"}
                />
            }
        />
    );
};

CustomDatePicker.defaultProps = {
    disabled: false,
    showTime: false,
};

export default CustomDatePicker;
