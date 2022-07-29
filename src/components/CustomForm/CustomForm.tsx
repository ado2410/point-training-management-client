import {Button, Divider, Form, Input, Space, Typography} from "antd";
import moment from 'moment';
import React, {useState} from "react";
import { callOrVar } from "../../utils/other";
import { getObjectValue } from "./CustomForm.utils";
import CustomDatePicker from "./CustomFormItem/CustomDatePicker";
import CustomFormItem from "./CustomFormItem/CustomFormItem";
import CustomInput from "./CustomFormItem/CustomInput";
import CustomSelect from "./CustomFormItem/CustomSelect";
import CustomSwitch from "./CustomFormItem/CustomSwitch";
import CustomTreeSelect from "./CustomFormItem/CustomTreeSelect";

const CustomForm: React.FC<CustomFormProps> = (props: CustomFormProps) => {
    const {initialValues, errors, fields: form, options, layout, col, hideSubmitButton, submitLabel, onFinish, onValuesChange } = props;
    const [formInstance] = Form.useForm();
    const [values, setValues] = useState(initialValues);

    //Lấy dữ liệu mặc định từ initialValues từ props;
    const getInitialValue = (name: string, dataIndex: string | string[]) => {
        let initialValue = undefined;
        if (dataIndex) {
            initialValue = getObjectValue(initialValues, dataIndex)
        } else {
            initialValue = initialValues![name]
        }
        return initialValue;
    }

    const hasInitialValue = (name: string, dataIndex: string | string[]) => {
        return Boolean(getInitialValue(name, dataIndex));
    }

    //Kiểm tra nếu có error từ props errors
    const hasError = (name: string) => {
        return Boolean(errors![name]);
    }

    //Lấy chuỗi error từ props errors
    const getError = (name: string) => {
        return errors![name];
    }

    const hasOptions = (name: string) => {
        return Boolean(options && options[name]);
    }

    const getOptions = (name: string) => {
        return options![name];
    }

    const renderFormItem = (field: CustomFormField<any>, index: number): React.ReactNode => {
        //Nếu field hide là true, không render
        const hide = callOrVar(field.hide, [values]) as boolean;
        if (hide === true) return <></>;

        //Lấy dữ liệu từ props, kiểm tra nếu là callback thì xử lý bằng getValue
        const type = field.type;
        const inputType = callOrVar(field.inputType, [values]) as string;
        const label = callOrVar(field.label, [values]) as React.ReactNode;
        const name = callOrVar(field.name, [values]) as string;
        const dataIndex = callOrVar(field.dataIndex, [values]) as string | string[];
        const disabled = callOrVar(field.disabled, [values]) as boolean;
        const component = callOrVar(field.component, [values]) as React.ReactNode;
        const options = field.options;

        //Lấy error từ errors, nếu không có thì lấy error từ field
        let validateStatus: "" | "success" | "warning" | "error" | "validating" | undefined;
        let help: React.ReactNode;
        if (hasError(name)) {
            validateStatus = "error";
            help = getError(name);
        } else {
            validateStatus = callOrVar(field.validateStatus, [values]) as any;
            help = callOrVar(field.help, [values]) as any;
        }
        
        //Lấy dữ liệu initialValue từ initialValues, nếu không có thì lấy initialValue từ field
        let initialValue;
        if (hasInitialValue(name, dataIndex)) initialValue = getInitialValue(name, dataIndex);
        else initialValue = callOrVar(field.initialValue, [values]) as any;

        //Render component theo loại
        const itemProps = {label, name, initialValue, validateStatus, help, disabled};
        let node: React.ReactNode = <></>;
        if (component) {
            node = <CustomFormItem key={index} {...itemProps} component={component}/>;
        } else {
            switch (type) {
                case "divider":
                    node = <Divider>{label}</Divider>
                break;
                case "select": case "treeselect":
                    const multiple = callOrVar(field.multiple, [values]) as boolean;
                    const showSearch = callOrVar(field.showSearch, [values]) as boolean;
    
                    //Lấy options từ options, nếu không có thì lấy từ field
                    let selectOptions: CustomSelectOption[] | CustomTreeSelectOption[];
                    if (hasOptions(name)) selectOptions = getOptions(name);
                    else {
                        if (typeof options === 'string') {
                            if (hasOptions(options)) selectOptions = getOptions(options);
                            else selectOptions = [];
                        }
                        else selectOptions = callOrVar(options, [values, props.options]) as CustomSelectOption[] | CustomTreeSelectOption[];
                    }
                    
                    if (type === "select") node = (
                        <CustomSelect
                            key={index}
                            {...itemProps}
                            multiple={multiple}
                            showSearch={showSearch}
                            options={selectOptions as CustomSelectOption[]}
                        />
                    );
                    else if (type === "treeselect") node = (
                        <CustomTreeSelect
                            key={index}
                            {...itemProps}
                            multiple={multiple}
                            showSearch={showSearch}
                            options={selectOptions as CustomTreeSelectOption[]}
                        />
                    );
                    break;
                case "date":
                case "datetime":
                    //Chuyển đổi ngày sang moment
                    const format = type === "date" ? "YYYY/MM/DD" : "YYYY/MM/DD HH:mm:ss";
                    initialValue = initialValue && moment(initialValue, format);
                    node = <CustomDatePicker key={index} showTime={type === "datetime"} {...itemProps} initialValue={initialValue} />
                    break;
                case "switch":
                    node = <CustomSwitch key={index} {...itemProps} defaultChecked={initialValue} />
                    break;
                case "hidden":
                    node = <CustomFormItem key={index} style={{display: "none"}} {...itemProps} component={<Input {...itemProps} type="hidden" />} />
                    break;
                default:
                    node = <CustomInput key={index} {...itemProps} type={inputType} />;
                    break;
            }
        }
        return node;
    }

    const handleValuesChange = (newValues: any, allValues: any) => {
        setValues(allValues);
        onValuesChange!(allValues);
    }

    return (
        <Form
            layout={layout}
            form={formInstance}
            labelCol={{ span: col?.label }}
            wrapperCol={{ span: col?.wrapper }}
            onFinish={onFinish}
            onValuesChange={handleValuesChange}
        >
            {form?.map((field, index) =>
                renderFormItem(field, index)
            )}

            {(!hideSubmitButton || hideSubmitButton === false) && (
                <Space align="center" direction="vertical" style={{width: "100%"}}>
                    <Button type="primary" htmlType="submit">{submitLabel}</Button>
                </Space>
            )}
        </Form>
    );
}

CustomForm.defaultProps = {
    initialValues: {},
    fields: [],
    errors: {},
    col: {
        label: 7,
        wrapper: 17,
    },
    hideSubmitButton: false,
    submitLabel: "Xác nhận",
    layout: "horizontal",
    onValuesChange: () => {},
    onFinish: () => {},
}

export default CustomForm;