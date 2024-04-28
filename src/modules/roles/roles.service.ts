import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './model/roles.model'

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role
    }

    async getAll() {
        const role = await this.roleRepository.findAll({
            include: { all: true },
        })
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } })
        return role
    }

    async deleteRole(value: string) {
        await this.roleRepository.destroy({ where: { value } })
        return { status: HttpStatus.OK, message: 'Role deleted' }
    }

    async updateRole(value: string, dto) {
        const role = await this.getRoleByValue(value)
        if (!role) {
            throw new Error('Role not found')
        }
        role.value = dto.value
        role.description = dto.description
        await role.save()
        return role
    }
}
