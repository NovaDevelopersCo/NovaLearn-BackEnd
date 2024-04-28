import { HttpStatus, Injectable, HttpException } from '@nestjs/common'
import { User } from './model/users.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcryptjs'
import { BanUserDto } from './dto/ban-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
        private authService: AuthService
    ) {}

    async createUser(dto: CreateUserDto) {
        const candidate = await this.getUserByEmail(dto.email)
        const role = await this.roleService.getRoleByValue('GUEST')
        if (candidate) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST
            )
        }
        const hashPassword = await bcrypt.hash(dto.password, 10)
        const user = await this.userRepository.create({
            roleId: role.id,
            ...dto,
            password: hashPassword,
        })
        return this.generateToken(user)
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        })
        return users
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        })
        return user
    }

    async changeRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (user && role) {
            user.roleId = role.id
            user.save()
            return user
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user
    }
}
