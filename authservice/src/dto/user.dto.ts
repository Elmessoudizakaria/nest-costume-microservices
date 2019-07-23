import * as mongoose from 'mongoose';

export class CreateUserDto {
    readonly login: string;
    readonly password: string;
    readonly username: string;
}

export class LoginUser {
    readonly login: string;
    readonly password: string;
}
