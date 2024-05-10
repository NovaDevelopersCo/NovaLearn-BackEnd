import { Module } from '@nestjs/common'
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/model/users.model';
import { Team } from './model/teams.model';
import { FilesModule } from '../files/files.module';

@Module({
    providers: [TeamsService],
    controllers: [TeamsController],
    imports: [SequelizeModule.forFeature([User, Team]), FilesModule],
})
export class TeamsModule {}
