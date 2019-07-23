import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interfaces';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUser } from '../dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(user: CreateUserDto) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async findByLogin(user: LoginUser) {
        const { login, password } = user;
        return await this.userModel.findOne({ login, password }).exec();
    }

    async findByPayload(payload: any) {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }
}
