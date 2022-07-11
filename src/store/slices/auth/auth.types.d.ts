interface AuthState {
    isLoggedIn: boolean;
    userType?: number;
    user?: User;
    accessToken?: string;
}