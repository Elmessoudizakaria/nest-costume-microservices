import * as mongoose from 'mongoose';

export interface Lign extends mongoose.Document{
    readonly status:string;
    readonly offreId:string;
    readonly contratId:string;
    readonly dateFin:Date;
}