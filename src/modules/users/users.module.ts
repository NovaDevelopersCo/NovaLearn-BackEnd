import { Module, forwardRef } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './model/users.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from 'src/modules/roles/model/roles.model'
import { RolesModule } from 'src/modules/roles/roles.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { Post } from 'src/modules/posts/model/posts.model'
import { TariffModule } from '../tariff/tariff.module'

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, Post]),
        RolesModule,
        TariffModule,
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
