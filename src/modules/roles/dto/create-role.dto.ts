import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Значение роли' })
    readonly title: string

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    readonly description: string

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    readonly level_access: number
}
