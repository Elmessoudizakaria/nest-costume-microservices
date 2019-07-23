import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stratgy';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService]
})
export class AuthModule {}
