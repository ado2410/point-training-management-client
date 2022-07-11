export const UserType = {
    ADMIN: 1,
    IMPORTER: 2,
    STUDENT: 3,
}

export const isAdmin = (auth: AuthState) => auth.userType === UserType.ADMIN;
export const isImporter = (auth: AuthState) => auth.userType === UserType.IMPORTER;
export const isStudent = (auth: AuthState) => auth.userType === UserType.STUDENT;

export const getUserType = (id: number) => {
    switch (id) {
        case 1: return UserType.ADMIN;
        case 2: return UserType.IMPORTER;
        case 3: return UserType.STUDENT;
    }
}