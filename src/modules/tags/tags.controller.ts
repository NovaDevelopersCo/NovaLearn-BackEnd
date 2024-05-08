import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { TagsService } from './tags.service'
import { CreateTagDto } from './dto/create-tag.dto'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { Tags } from './model/tags.model'
import { Roles } from 'src/decorators/roles-auth.decorator'
import { RolesGuard } from 'src/guards/roles.guard'

@ApiTags('Теги')
@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @ApiOperation({ summary: 'Создание Тега' })
    @ApiResponse({ status: 200, type: Tags })
    @Roles('ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateTagDto) {
        return this.tagsService.createTag(dto)
    }

    @Get('/:title')
    getBytitle(@Param('title') title: string) {
        return this.tagsService.getTagByTitle(title)
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.tagsService.getTagById(id)
    }

    @Put('/:id')
    @Roles('ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    updateRole(@Param('id') id: number, @Body() dto: CreateTagDto) {
        return this.tagsService.updateTag(id, dto)
    }

    @Delete('/:id')
    @Roles('SUPER_ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    deleteRole(@Param('id') id: number) {
        return this.tagsService.deleteTag(id)
    }

    @Get()
    @Roles('ADMIN')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(RolesGuard)
    getAll() {
        return this.tagsService.getAll()
    }
}
