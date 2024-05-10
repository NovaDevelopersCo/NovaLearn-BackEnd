import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateTeamDto } from "./dto/create-team.dto";
import { TeamsService } from "./teams.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Team } from "./model/teams.model";
import { ChangeTeamDateDto } from "./dto/change-team.dto";

@Controller('teams')
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @ApiOperation({ summary: 'Создать команду' })
    @ApiResponse({ status: 200 })
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createTeam(@Body() dto: CreateTeamDto, @UploadedFile() image) {
        return this.teamsService.createTeam(dto, image)
    }

    @ApiOperation({ summary: 'Получить все команды' })
    @ApiResponse({ status: 200, type: [Team] })
    @Get()
    getAll() {
        return this.teamsService.getAllTeams()
    }

    @ApiOperation({ summary: 'Получить команду по названию' })
    @ApiResponse({ status: 200, type: [Team] })
    @Get('/title')
    getTeamByTitle(@Body('title') title: string) {
        return this.teamsService.getTeamByTitle(title)
    }

    @ApiOperation({ summary: 'Заменить название, описание, картинку' })
    @ApiResponse({ status: 200 })
    @Put('/:id')
    async changeTeamDate(
        @Param('id') id: number,
        @Body() dto: ChangeTeamDateDto
    ) {
        return this.teamsService.changeTeamDate(dto, id)
    }

    @ApiOperation({ summary: 'Удалить команду' })
    @ApiResponse({ status: 200 })
    @Delete('/:id')
    delTeam(@Param('id') id: number) {
        return this.teamsService.delTeam(id)
    }
}