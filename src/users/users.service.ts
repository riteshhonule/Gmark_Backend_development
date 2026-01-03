import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto';
import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
    UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: any[] = [];
    private idCounter = 1;

    constructor(private readonly configService: ConfigService) {
        this.createAdmin({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'Admin@123',
        });
    }

    // =========================
    // HELPER → HIDE PASSWORD
    // =========================
    private sanitizeUser(user: any) {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    // =========================
    // ADMIN → GET ALL USERS
    // =========================
    getAll() {
        const debug = this.configService.get<boolean>('DEBUG');
        if (debug) {
            console.log('DEBUG: Fetching all users');
        }
        return this.users.map(user => this.sanitizeUser(user));
    }

    // =========================
    // PUBLIC → ENV INFO
    // =========================
    getEnvInfo() {
        return {
            appName: this.configService.get<string>('APP_NAME'),
            ownerName: this.configService.get<string>('OWNER_NAME'),
            debug: this.configService.get<boolean>('DEBUG'),
        };
    }

    // =========================
    // USER / ADMIN → GET ONE
    // =========================
    getOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }

    // =========================
    // PUBLIC → SIGNUP
    // =========================
    create(data: CreateUserDto) {
        if (!data.email || !data.password) {
            throw new BadRequestException('Email and password are required');
        }

        const exists = this.users.find(u => u.email === data.email);
        if (exists) {
            throw new ConflictException('Email already exists');
        }

        const user = {
            id: this.idCounter++,
            ...data,
            role: 'user', // default role
        };

        this.users.push(user);
        return this.sanitizeUser(user);
    }

    // =========================
    // USER / ADMIN → UPDATE
    // =========================
    put(id: number, data: CreateUserDto) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }

        this.users[index] = {
            ...this.users[index],
            ...data,
        };

        return this.sanitizeUser(this.users[index]);
    }

    // =========================
    // USER / ADMIN → PATCH
    // =========================
    patch(id: number, data: Partial<CreateUserDto>) {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (data.password && data.password.length < 6) {
            throw new UnprocessableEntityException('Password too weak');
        }

        Object.assign(user, data);
        return this.sanitizeUser(user);
    }

    // =========================
    // ADMIN → DELETE
    // =========================
    delete(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }

        this.users.splice(index, 1);
        return true;
    }

    // =========================
    // ADMIN SEED (TESTING)
    // =========================
    createAdmin(data: CreateUserDto) {
        const exists = this.users.find(u => u.email === data.email);
        if (exists) {
            return;
        }

        const admin = {
            id: this.idCounter++,
            ...data,
            role: 'admin',
        };

        this.users.push(admin);
    }
    // 🔐 INTERNAL USE ONLY (Auth)
    findByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }

}
