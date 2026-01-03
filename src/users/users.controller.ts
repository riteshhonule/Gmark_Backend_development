import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    HttpCode,
    HttpStatus,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

import { UsersService } from './';
import { CreateUserDto } from './dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import {
    TrimStringPipe,
    LowercaseEmailPipe,
    RequiredFieldsPipe,
    PositiveNumberPipe,
} from '../common/pipes';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // ==============================
    // USER + ADMIN → OWN PROFILE
    // ==============================
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get my profile (User & Admin)' })
    @ApiResponse({ status: 200, description: 'Own profile returned' })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    @HttpCode(HttpStatus.OK)
    getMyProfile(@Req() req) {
        return this.usersService.getOne(req.user.sub);
    }

    // ==============================
    // ADMIN ONLY → GET ALL USERS
    // ==============================
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    @ApiResponse({ status: 200, description: 'List of users returned' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    @HttpCode(HttpStatus.OK)
    getUsers() {
        return this.usersService.getAll();
    }

    // ==============================
    // ADMIN ONLY → GET USER BY ID
    // ==============================
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by ID (Admin only)' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'User returned' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUser(
        @Param('id', ParseIntPipe, new PositiveNumberPipe()) id: number,
    ) {
        return this.usersService.getOne(id);
    }

    // ==============================
    // PUBLIC → SIGNUP
    // ==============================
    @ApiOperation({ summary: 'Create new user (Signup)' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(
        @Body(
            new RequiredFieldsPipe(['email', 'password']),
            new TrimStringPipe(),
            new LowercaseEmailPipe(),
        )
        body: CreateUserDto,
    ) {
        return this.usersService.create(body);
    }

    // ==============================
    // USER + ADMIN → UPDATE OWN DATA (ID CHECK RECOMMENDED)
    // ==============================
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user completely (User & Admin)' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateUser(
        @Param('id', ParseIntPipe, new PositiveNumberPipe()) id: number,
        @Body(new TrimStringPipe(), new LowercaseEmailPipe())
        body: CreateUserDto,
    ) {
        return this.usersService.put(id, body);
    }

    // ==============================
    // ADMIN ONLY → DELETE USER
    // ==============================
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user (Admin only)' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteUser(
        @Param('id', ParseIntPipe, new PositiveNumberPipe()) id: number,
    ) {
        this.usersService.delete(id);
        return { message: 'User deleted successfully' };
    }
}
