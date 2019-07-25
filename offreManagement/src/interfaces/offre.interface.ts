import * as mongoose from 'mongoose';

export interface Offre extends mongoose.Document{
    readonly name:string;
    readonly monthlyPrice:number;
    readonly fmsPrice:string;
    readonly options:[string];
    readonly isActive:boolean;
}