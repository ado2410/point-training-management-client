import store from "./store";
import { REDUX_LOCAL_STORAGE_NAME } from "./store.constants";

//Load redux state trên trinh duyệt
export const loadState = () => {
    const storedState = localStorage.getItem(REDUX_LOCAL_STORAGE_NAME);
    const initialState: StoreState = storedState ? JSON.parse(storedState) : undefined;
    return initialState;
}

//Lưu redux state vào trình duyệt
export const saveState = () => {
    localStorage.setItem(
        REDUX_LOCAL_STORAGE_NAME,
        JSON.stringify(store.getState())
    );
};