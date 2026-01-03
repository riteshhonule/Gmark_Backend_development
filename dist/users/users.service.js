"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    users = [];
    idCounter = 1;
    getAll() {
        return this.users;
    }
    getOne(id) {
        return this.users.find(u => u.id === id);
    }
    create(data) {
        const user = {
            id: this.idCounter++,
            name: data.name,
            email: data.email,
            password: data.password,
        };
        this.users.push(user);
        return user;
    }
    put(id, data) {
        const user = this.getOne(id);
        if (!user)
            return null;
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        return user;
    }
    patch(id, data) {
        const user = this.getOne(id);
        if (!user)
            return null;
        Object.assign(user, data);
        return user;
    }
    delete(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map