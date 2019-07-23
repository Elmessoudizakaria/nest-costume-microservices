import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    readonly login: string;
    readonly password: string;
    readonly username: string;
}
