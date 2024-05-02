import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { User } from './model/users.model'
import { RolesGuard } from 'src/guards/roles.guard'
import { Roles } from 'src/decorators/roles-auth.decorator'
import { BanUserDto } from './dto/ban-user.dto'
import { DelUserDto } from './dto/delete-user.dto'
import { ChangeUserDateDto } from './dto/change-user.dto'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN', 'SUPER_ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({ summary: 'Получить пользователя по Email' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN', 'SUPER_ADMIN', 'TEACHER')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    @Get('/email')
    getUserByEmail(@Body('email') email: string) {
        return this.userService.getUserByEmail(email)
    }

    @ApiOperation({ summary: 'Замена роли, email, пароля' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'SUPER_ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    @Post('/change')
    changeUserDate(@Body() dto: ChangeUserDateDto) {
        return this.userService.changeUserDate(dto)
    }

    @Post('/createUser')
    @ApiOperation({ summary: 'Создать пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'SUPER_ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    createUser() {
        return this.userService.createUser()
    }

    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'SUPER_ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.userService.ban(dto)
    }
    @ApiOperation({ summary: 'Удалить Пользывателя' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'SUPER_ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    @Delete('/del')
    delUser(@Body('email') dto: DelUserDto) {
        return this.userService.delUser(dto)
    }
}
