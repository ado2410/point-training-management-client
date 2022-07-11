import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/auth.slice";
import { loadState, saveState } from "./store.actions";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    //Load state trên trình duyệt
    preloadedState: loadState(),
});

//Lưu lại trên trình duyệt khi có sự thay đổi store;
store.subscribe(saveState);

export default store;
