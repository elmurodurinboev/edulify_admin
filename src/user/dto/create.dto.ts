import { IsNotEmpty, IsString } from "class-validator"

export class CreateDto {
    @IsNotEmpty({ message: "name to'ldirilishi shart" })
    @IsString({ message: "name string tipida bo'lishi kerak" })
    name: string

    @IsNotEmpty({ message: "username to'ldirilishi shart" })
    @IsString({ message: "username string tipida bo'lishi kerak" })
    username: string

    @IsNotEmpty({ message: "password to'ldirilishi shart" })
    @IsString({ message: "password string tipida bo'lishi kerak" })
    password: string

    // @IsString({ message: "password string tipida bo'lishi kerak" })
    // role: 'ADMIN' | 'MANAGER'
}