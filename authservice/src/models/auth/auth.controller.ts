import {
    Controller,
    Get,
    UseGuards,
    Post,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common';
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
        if (user) {
            const payload = {
                username: user.username
            };
            const token = await this.authService.signPayload(payload);
            return { user, token };
        } else {
            throw new HttpException(
                'LOGIN OR PASSWORD ARE WRONG',
                HttpStatus.UNAUTHORIZED
            );
        }
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
