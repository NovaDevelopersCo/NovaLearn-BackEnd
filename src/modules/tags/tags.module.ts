import { Module } from '@nestjs/common'
import { TagsService } from './tags.service'
import { TagsController } from './tags.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Tags } from './model/tags.model'
import { User } from '../users/model/users.model'
import { AuthModule } from '../auth/auth.module'
import { UserTag } from './model/tagsUser.model'

@Module({
    providers: [TagsService],
    controllers: [TagsController],
    imports: [
        SequelizeModule.forFeature([Tags, UserTag, User]),
    ],
    exports: [TagsService],
})
export class TagsModule {}
