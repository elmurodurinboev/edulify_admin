import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CenterService } from './center.service';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/updateDto';

@Controller('center')
export class CenterController {
    constructor(
        private centerService: CenterService
    ) { }

    @Roles(Role.Admin, Role.Manager)
    @Get()
    async getAll() {
        return this.centerService.getAll()
    }

    @Roles(Role.Admin, Role.Manager)
    @Post()
    async create(@Body() createDto: CreateDto) {
        return this.centerService.create(createDto)
    }

    @Roles(Role.Admin, Role.Manager)
    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.centerService.getById(Number(id))
    }

    @Roles(Role.Admin, Role.Manager)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateDto: UpdateDto) {
        return this.centerService.update(Number(id), updateDto)
    }

    @Roles(Role.Admin)
    @HttpCode(204)
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.centerService.delete(Number(id))
    }

}
