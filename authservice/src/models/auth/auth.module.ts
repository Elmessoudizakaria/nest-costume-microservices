import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stratgy';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../../schema/user.schema';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from '../../shared/http.interceptor';
import { HttpExceptionFilter } from '../../shared/http-filter';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        UserService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ]
})
export class AuthModule {}
