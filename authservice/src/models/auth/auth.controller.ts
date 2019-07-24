import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUser, CreateUserDto } from '../../dto/user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async tempAuth() {
        return { auth: 'works' };
    }

    @Post('/login')
    async login(@Body() userDto: LoginUser) {
        const user = await this.userService.findByLogin(userDto);

        const payload = {
            username: user.username
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post('/register')
    async register(@Body() userDto: CreateUserDto) {
        const user = await this.userService.create(userDto);

        const payload = {
            username: user.username
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
