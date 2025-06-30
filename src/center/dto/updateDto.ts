import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export enum Status {
    activ = "active",
    blocked = "blocked",
    deleted = "deleted"
}

export class UpdateDto {
    @IsNotEmpty({ message: "name to'ldirilishi shart" })
    @IsString({ message: "name string tipida bo'lishi kerak" })
    name?: string

    @IsNotEmpty({ message: "status to'ldirilishi shart" })
    @IsEnum(Status, { message: "Bunday qiymat mavjud emas" })
    status?: Status

    @IsNotEmpty({ message: "prefix to'ldirilishi shart" })
    @IsString({ message: "prefix string tipida bo'lishi kerak" })
    prefix?: string

    @IsNotEmpty({ message: "ownerName to'ldirilishi shart" })
    @IsString({ message: "ownerName string tipida bo'lishi kerak" })
    ownerName?: string

    @IsNotEmpty({ message: "ownerPhone to'ldirilishi shart" })
    @IsString({ message: "ownerPhone string tipida bo'lishi kerak" })
    ownerPhone?: string

    @IsNotEmpty({ message: "Email to'ldirilishi shart" })
    @IsEmail()
    ownerEmail?: string

    @IsNotEmpty({ message: "wwnerPinfl to'ldirilishi shart" })
    @IsString()
    ownerPinfl?: string
}