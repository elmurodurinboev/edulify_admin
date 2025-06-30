import { IsOptional, IsString } from "class-validator"

export class UpdateDto {
    @IsOptional()
    @IsString({ message: "name string tipida bo'lishi kerak" })
    name?: string

    @IsOptional()
    @IsString({ message: "name string tipida bo'lishi kerak" })
    username?: string

    @IsOptional()
    @IsString({ message: "name string tipida bo'lishi kerak" })
    password?: string
}