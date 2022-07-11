//Lấy dữ liệu từ object bằng dataIndex là chuỗi hoặc mảng chuỗi
export const getObjectValue = (object: any, dataIndex: string | string[]) => {
    let value: any = undefined;
    if (Object.entries(object).length > 0) {
        if (Array.isArray(dataIndex)) {
            value = dataIndex.reduce((o, i) => o[i], object);
        } else {
            value = object[dataIndex];
        }
    }
    return value;
};