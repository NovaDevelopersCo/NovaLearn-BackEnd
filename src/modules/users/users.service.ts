import { HttpStatus, Injectable, HttpException, Logger } from '@nestjs/common'
import { User } from './model/users.model'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from '../roles/roles.service'
import { changeUserDate } from './dto/change-user.dto'
import { BanUserDto } from './dto/ban-user.dto'
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {}
    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        })
        Logger.log('Everyone users got:' + users.length)
        return users
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        })
        Logger.log('User with email: ' + user.email + 'got')
        return user
    }

    async delUser(email) {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        try {
            await user.destroy()
            Logger.log(`User ${email} was deleted successfully`)
            return { message: 'User deleted successfully', user }
        } catch (error) {
            Logger.log(
                `Error deleting user with email ${email}: ${error.message}`
            )
            throw new HttpException(
                'Error deleting user',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async createUser() {
        const plainPassword = Math.random().toString(36).slice(-8)
        const hashPassword = await bcrypt.hash(plainPassword, 10)

        const user = await this.userRepository.create({
            email: Math.random().toString(36).slice(-8) + '@nova.com',
            password: hashPassword,
        })

        const role = await this.roleService.getRoleByValue('STUDENT')
        if (user && role) {
            user.roleId = role.id
            await user.save()
        }

        const credential = {
            login: user.email,
            password: plainPassword,
        }

        Logger.log('User created successfully')
        return credential
    }

    async changeUserDate(dto: changeUserDate) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
        })
        const role = await this.roleService.getRoleByValue(dto.value)
        if (user && role) {
            user.roleId = role.id
            user.save()
        }
    }

    // async changeRole(dto: AddRoleDto) {
    //     const user = await this.userRepository.findByPk(dto.userId)
    //     const role = await this.roleService.getRoleByValue(dto.value)
    //     if (user && role) {
    //         user.roleId = role.id
    //         user.save()
    //         Logger.log('Role chenged')
    //         return user
    //     }
    //     Logger.log('User or role not found')
    //     throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    // }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            Logger.log('User not found')
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        try {
            user.banned = true
            user.banReason = dto.banReason
            await user.save()
            Logger.log('User banned successfully')
            return user
        } catch {
            Logger.log('Error banning user')
            throw new HttpException(
                'Error banning user',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
