import * as mongoose from 'mongoose';

export interface Bill extends mongoose.Document{
    readonly dateCreation:Date;
    readonly total:number;
    readonly contratId:string;
}