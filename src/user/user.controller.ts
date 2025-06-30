import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Roles(Role.Admin)
    @Post()
    async create(@Body() createDto: CreateDto) {
        return this.userService.create(createDto)
    }

    @Roles(Role.Admin)
    @Get()
    async getAll() {
        return this.userService.getAll()
    }

    @Roles(Role.Admin)
    @Get(":id")
    async getById(@Param('id') id: string) {
        return this.userService.getById(Number(id))
    }

    @Roles(Role.Admin)
    @Patch(":id")
    async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
        return this.userService.update(Number(id), updateDto)
    }

    @Roles(Role.Admin)
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return this.userService.delete(Number(id))
    }

}
