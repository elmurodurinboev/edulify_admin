
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(loginDto.username);

        const isPasswordMatch = await this.usersService.decryptPassword(loginDto.password, user.password)

        if (!isPasswordMatch) {
            throw new BadRequestException("Password is incorrect.")
        }

        const payload = { username: user.username, name: user.name, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
