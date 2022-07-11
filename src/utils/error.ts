export const handleServerError = (serverErrors: ServerError[]): Record<string, string> => {
    const errors: Record<string, string> = {};
    serverErrors.forEach(error =>
        !errors[error.param]
            ? (errors[error.param] = error.msg)
            : ""
    );
    return errors;
}

export const handleServerErrorImport = (serverErrors: ServerError[]): ImportError[] => {
    const errors: ImportError[] = serverErrors.map(error => {
        const errorParam = error.param
            .replace("[", "")
            .replace("]", "")
            .split(".");
        return {
            index: parseInt(errorParam[0]),
            key: errorParam[1],
            message: error.msg,
        };
    });
    return errors;
}