import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from "bcrypt"
import { Prisma } from '@prisma/client';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
    ) { }
    async create(createDto: CreateDto) {
        try {
            const existingUser = await this.prismaService.user.findUnique({
                where: { username: createDto.username },
            });

            if (existingUser) {
                // HttpException — bu Nest o‘zi hal qiladi
                throw new BadRequestException('Bu username band');
            }

            const hash = await this.encryptPassword(createDto.password, 10);

            const user = await this.prismaService.user.create({
                data: {
                    ...createDto,
                    password: hash,
                },
                select: {
                    id: true,
                    name: true,
                    role: true,
                    username: true,
                    createdAt: true,
                }
            });

            return {
                success: true,
                data: user,
            };
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error; // asliga qaytar
            }

            // Prisma xatosini tutish (masalan unique constraint)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Bunday foydalanuvchi mavjud');
                }
            }

            throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
        }
    }

    async getAll(search?: string) {
        try {
            const data = await this.prismaService.user.findMany({
                where: search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { username: { contains: search, mode: 'insensitive' } }
                    ]
                } : undefined,
                select: {
                    id: true,
                    name: true,
                    username: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                }
            })
            return {
                success: true,
                data
            }
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
        }
    }

    async getById(id: number) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            if (!user) {
                throw new BadRequestException('Bunday foydalanuvchi mavjud emas');
            }

            return {
                success: true,
                data: user
            }
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
        }
    }

    async update(id: number, updateDto: UpdateDto) {
        try {
            const user = await this.prismaService.user.findUnique({ where: { id } })

            if (!user) {
                throw new BadRequestException('Bunday foydalanuvchi mavjud emas');
            }

            const updatedUser = await this.prismaService.user.update({
                where: { id }, data: updateDto, select: {
                    id: true,
                    name: true,
                    username: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return {
                success: true,
                data: updatedUser
            }

        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
        }
    }

    async delete(id: number) {
        try {
            const user = await this.prismaService.user.findUnique({ where: { id } })

            if (!user) {
                throw new BadRequestException('Bunday foydalanuvchi mavjud emas');
            }

            await this.prismaService.user.delete({ where: { id } })
            return
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
        }
    }

    async findOne(username: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { username }
            })

            if (!user) {
                throw new BadRequestException('Bunday foydalanuvchi mavjud emas');
            }
            return user
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
        }
    }

    async encryptPassword(plainText, saltRounds) {
        return await bcrypt.hash(plainText, saltRounds)
    }

    async decryptPassword(plainText, hash) {
        return await bcrypt.compare(plainText, hash)
    }
}
