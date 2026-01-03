import { UsersService } from './';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): import("./users.service").User[];
    getUser(id: number): import("./users.service").User;
    createUser(body: any): import("./users.service").User;
    updateUser(id: number, body: any): import("./users.service").User;
    partialUpdate(id: number, body: any): import("./users.service").User;
    deleteUser(id: number): {
        message: string;
    };
}
