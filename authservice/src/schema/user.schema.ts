import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    username: String
});
