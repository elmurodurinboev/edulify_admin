import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsNotEmpty({message: "username bo'sh bo'lmasligi kerak"})
    @IsString()
    username: string

    @IsNotEmpty({message: "password bo'sh bo'lmasligi kerak"})
    password: string
}