import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { User } from './users/model/users.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/model/roles.model'
import { UserRoles } from './roles/model/user-roles.model'
import { AuthModule } from './modules/auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { Post } from './posts/model/posts.model'
import { FilesModule } from './modules/files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            models: [User, Role, UserRoles, Post],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ],
})
export class AppModule {}
