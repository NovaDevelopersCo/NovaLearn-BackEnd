import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto'
import { UsersService } from 'src/modules/users/users.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/modules/users/model/users.model'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async token(token: string): Promise<any> {
        try {
            const decodedToken = this.jwtService.verify(token)
            const { roles } = decodedToken

            if (!roles) {
                Logger.log('Invalid token')
                throw new UnauthorizedException('Invalid token')
            }

            const active = {
                SUPER_ADMIN: 'valid',
                ADMIN: 'valid',
            }
            Logger.log('valid')
            return active[roles.active] || null
        } catch (error) {
            Logger.log('Invalid token')
            throw new UnauthorizedException('Invalid token')
        }
    }
    async createUser() {
        const hashPassword = await bcrypt.hash(
            Math.random().toString(36).slice(-8),
            10
        )
        const user = await this.userService.createUser({
            email: Math.random().toString(36).slice(-8),
            password: hashPassword,
        })
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload),
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password
        )
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Wrong email or password' })
    }
}
