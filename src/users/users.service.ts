import { Injectable } from '@nestjs/common';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // ✅ ADD THIS
}

@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    getAll(): User[] {
        return this.users;
    }

    getOne(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }

    create(data: any): User {
        const user: User = {
            id: this.idCounter++,
            name: data.name,
            email: data.email,
            password: data.password, // ✅ ADD THIS
        };
        this.users.push(user);
        return user;
    }

    // ✅ PUT → FULL REPLACE
    put(id: number, data: any): User | null {
        const user = this.getOne(id);
        if (!user) return null;

        user.name = data.name;
        user.email = data.email;
        user.password = data.password; // ✅ ADD THIS

        return user;
    }


    // ✅ PATCH → PARTIAL UPDATE
    patch(id: number, data: any): User | null {
        const user = this.getOne(id);
        if (!user) return null;

        Object.assign(user, data);
        return user;
    }

    delete(id: number): boolean {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
}
