export function groupBy(objectArray: Array<any>, property: string) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

export function sumByKey(arr: any[], key: {label: string, dataIndex: string}, sumColumns: Array<string>) {
    const label = key.label;
    const dataIndex = key.dataIndex;
    const newArr: Array<any> = [];

    arr.forEach((item) => {
        const index = findIndex(newArr, label, item[dataIndex]);
        if (index === -1) {
            const row = {[label]: item[dataIndex]};
            sumColumns.forEach((column: string) => row[column] = item[column]);
            newArr.push(row);
        } else {
            sumColumns.forEach((column: string) => newArr[index][column] += item[column]);
        }
    });
    return newArr;
}

function findIndex(arr: Array<any>, key: string, value: any) {
    return arr.findIndex((item) => item[key] === value);
}