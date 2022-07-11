interface CustomDraggerProps {
    icon?: React.ReactNode;
    maxCount?: number;
    helperText?: string;
    onUpload?: (file: File) => void;
}