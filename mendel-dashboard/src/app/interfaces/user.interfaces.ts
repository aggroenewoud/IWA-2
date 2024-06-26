export interface User {
    username: string;
    password: string;
    role: string;
}

export interface Users {
    [key: string]: User;
}