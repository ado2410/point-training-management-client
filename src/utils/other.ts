//Lấy dữ liệu từ callback hoặc variable
export const callOrVar = <T>(input: T, args: any[] = []) => {
    if (typeof input === "function") return input(...args) as T;
    else return input as T;
}