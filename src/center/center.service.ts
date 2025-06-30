import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/updateDto';

@Injectable()
export class CenterService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getAll() {
        try {
            const data = await this.prismaService.center.findMany({})
            return {
                success: true,
                data
            }
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Xatolik yuz berdi');
        }
    }

    async create(createDto: CreateDto) {
        try {
            const existingCenter = await this.prismaService.center.findUnique({ where: { prefix: createDto.prefix } })

            if (existingCenter) {
                throw new BadRequestException("Bunday prefixga ega o'quv markaz mavjud")
            }

            const data = await this.prismaService.center.create({
                data: createDto
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

            throw new InternalServerErrorException('Xatolik yuz berdi');
        }
    }

    async getById(id: number) {
        try {
            const data = await this.prismaService.center.findUnique({ where: { id } })

            if (!data) {
                throw new BadRequestException("Ma'lumot topilmadi")
            }

            return {
                success: true,
                data
            }
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Xatolik yuz berdi');
        }
    }

    async update(id: number, updateDto: UpdateDto) {
        try {
            const existingCenter = await this.prismaService.center.findUnique({ where: { id } })

            if (!existingCenter) {
                throw new BadRequestException("Bunday ID ga ega ma'lumot topilmadi")
            }

            const data = await this.prismaService.center.update({ where: { id }, data: updateDto })

            return {
                success: true,
                data
            }
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Xatolik yuz berdi');
        }
    }
    async delete(id: number) {
        try {
            const existingCenter = await this.prismaService.center.findUnique({ where: { id } })

            if (!existingCenter) {
                throw new BadRequestException("Bunday ID ga ega ma'lumot topilmadi")
            }

            await this.prismaService.center.delete({ where: { id } })

            return
        } catch (error) {
            // HttpExceptionlarni o'tkazib yuborish
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Xatolik yuz berdi');
        }
    }
}
