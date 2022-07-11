import React from "react";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const CustomDragger: React.FC<CustomDraggerProps> = (props: CustomDraggerProps) => {
    const {icon, maxCount, helperText, onUpload} = props;

    //File được upload
    const handleUpload = (file: File) => {
        onUpload!(file);
        return false;
    }
    
    return (
        <Dragger
            beforeUpload={handleUpload}
            maxCount={maxCount}
        >
            <p className="ant-upload-drag-icon">{icon}</p>
            <p className="ant-upload-text">{helperText}</p>
        </Dragger>
    );
}

CustomDragger.defaultProps = {
    icon: <InboxOutlined />,
    maxCount: 1,
    helperText: "Chọn hoặc kéo file vào khung nhập",
    onUpload: () => {},
};

export default CustomDragger;
