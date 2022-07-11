interface ServerError {
    location: string;
    msg: string;
    param: string;
}

interface ServerListData<T> {
    data: T[];
}