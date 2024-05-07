import { ApiProperty } from '@nestjs/swagger'
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript'
import { Post } from 'src/modules/posts/model/posts.model'
import { Role } from 'src/modules/roles/model/roles.model'
import { Tariff } from 'src/modules/tariff/model/tariff.model'

interface UserCreationAttrs {
    email: string
    password: string
    tariffId: number
    tariffs: Tariff
    roleId: number
    roles: Role
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентефикатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @ApiProperty({ example: 'test@gmail.com', description: 'Уникальная почта' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: 'true', description: 'Забанен ли пользователь' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({ example: 'Флуд', description: 'Прчина бана' })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    banReason: string

    @ApiProperty({ example: 1, description: 'Id категории' })
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number

    @ApiProperty({ example: 1, description: 'Id тарифа' })
    @ForeignKey(() => Tariff)
    @Column({ type: DataType.INTEGER })
    tariffId: number

    @BelongsTo(() => Tariff)
    tariffs: Tariff

    @BelongsTo(() => Role)
    roles: Role

    @HasMany(() => Post)
    posts: Post[]
}
