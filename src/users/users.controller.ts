import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { UsersService } from './';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    // ✅ GET → 200
    @Get()
    @HttpCode(HttpStatus.OK)
    getUsers() {
        return this.usersService.getAll();
    }

    // ✅ GET by ID → 200 / 404
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUser(@Param('id') id: number) {
        const user = this.usersService.getOne(+id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // ✅ POST → 201 / 400
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() body) {
        if (!body.name || !body.email) {
            throw new BadRequestException('Invalid input');
        }
        return this.usersService.create(body);
    }

    // ✅ PUT → FULL UPDATE (200 / 400 / 404)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateUser(@Param('id') id: number, @Body() body) {
        if (!body.name || !body.email || !body.password) {
            throw new BadRequestException('All fields are required for PUT');
        }

        const user = this.usersService.put(+id, body);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // ✅ PATCH → PARTIAL UPDATE (200 / 404)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    partialUpdate(@Param('id') id: number, @Body() body) {
        const user = this.usersService.patch(+id, body);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // ✅ DELETE → 200 / 404
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteUser(@Param('id') id: number) {
        const result = this.usersService.delete(+id);
        if (!result) throw new NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }
}
