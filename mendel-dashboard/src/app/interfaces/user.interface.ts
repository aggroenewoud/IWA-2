export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    
}

export interface Users{
    users: User[];
}