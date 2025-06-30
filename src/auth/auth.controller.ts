import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto)
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async profile(@Request() req) {
        return req.user
    }
}
