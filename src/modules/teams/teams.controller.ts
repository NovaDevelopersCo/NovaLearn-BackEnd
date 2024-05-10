import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateTeamDto } from "./dto/create-team.dto";
import { TeamsService } from "./teams.service";

@Controller('teams')
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createTeam(@Body() dto: CreateTeamDto, @UploadedFile() image) {
        return this.teamsService.createTeam(dto, image)
    }
}