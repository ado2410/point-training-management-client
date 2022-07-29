import moment from "moment";

export function excelDateToJSDate(excelDate: number): Date {
    var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
    return date;
}

export function formatDate(date: string | undefined, format: string  = "DD/MM/YYYY"): string {
    if (date?.charAt(date.length - 1) === 'Z') date = date.slice(0, -1);
    if (date) return moment(date).format(format);
    return '';
}