import { createSlice } from '@reduxjs/toolkit';
import { getUserType } from './auth.constants';

const initialState: AuthState = {
    isLoggedIn: false,
    userType: undefined,
    user: undefined,
    accessToken: undefined,
};

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login (state, action) {
            state.isLoggedIn = true;
            state.userType = getUserType(action.payload.user.user_type_id);
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logout (state) {
            state.isLoggedIn = false;
            state.userType = undefined;
            state.user = undefined;
            state.accessToken = undefined;
        }
    }
});

const { actions, reducer } = slice;
export const { login, logout } = actions;
export default reducer;