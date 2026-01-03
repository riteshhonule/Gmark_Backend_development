export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
export declare class UsersService {
    private users;
    private idCounter;
    getAll(): User[];
    getOne(id: number): User | undefined;
    create(data: any): User;
    put(id: number, data: any): User | null;
    patch(id: number, data: any): User | null;
    delete(id: number): boolean;
}
