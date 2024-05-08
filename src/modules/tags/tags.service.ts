import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tags } from './model/tags.model';
import { UserTag } from './model/tagsUser.model';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(Tags) private tagsRepository: typeof Tags,
        @InjectModel(UserTag) private userTagRepository: typeof UserTag
    ) {}

    async createTag(dto: CreateTagDto) {
        const tag = await this.tagsRepository.create(dto);
        return tag;
    }

    async getAll() {
        const tags = await this.tagsRepository.findAll({
            include: { all: true },
        });
        return tags;
    }

    async getTagByTitle(title: string) {
        const tag = await this.tagsRepository.findOne({ where: { title } });
        return tag;
    }

    async getTagById(id: number) {
        const tag = await this.tagsRepository.findOne({ where: { id } });
        return tag;
    }

    async deleteTag(id: number) {
        await this.tagsRepository.destroy({ where: { id } });
        return { status: HttpStatus.OK, message: 'Tag deleted' };
    }

    async updateTag(id: number, dto) {
        const tag = await this.getTagById(id);
        if (!tag) {
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
        }
        tag.title = dto.title;
        tag.description = dto.description;
        await tag.save();
        return tag;
    }
}
