import { IsNumber, IsString } from 'class-validator'

export class changeUserDate {
    @IsString({ message: 'Должно быть строкой' })
    readonly value: string
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'Должно быть числом' }
    )
    @IsString({ message: 'Должно быть строкой' })
    readonly email: string
    @IsString({ message: 'Должно быть строкой' })
    readonly password: string
}
