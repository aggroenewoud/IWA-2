export interface User {
    id: number;
    username: string;
    password: string; // Note: Storing passwords in the frontend is not recommended for real applications
    role: string;
    
}

// export interface Users{
//     users: User[];
// }