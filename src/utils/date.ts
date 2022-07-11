import moment from "moment";

export function excelDateToJSDate(excelDate: number): Date {
    var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
    return date;
}

export function formatDate(ISODate: string): string {
    if (ISODate) return moment(ISODate.slice(0, -1)).format("DD/MM/YYYY");
    return '';
}