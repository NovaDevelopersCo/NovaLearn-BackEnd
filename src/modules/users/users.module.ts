import { Module, forwardRef } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './model/users.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from 'src/roles/model/roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { AuthService } from 'src/modules/auth/auth.service'
import { AuthModule } from 'src/modules/auth/auth.module'
import { UserRoles } from 'src/roles/model/user-roles.model'
import { Post } from 'src/posts/model/posts.model'

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Post]),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
