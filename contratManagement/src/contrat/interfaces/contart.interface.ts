import * as mongoose from 'mongoose';

export interface Contrat extends mongoose.Document{
    readonly creationDate:Date;
    readonly actuelPrice:number;
    readonly offre:string;
    readonly duration:number;
    readonly observation:string;
    readonly contraType:string;
    readonly clientId:number;
    readonly isValide:boolean;
}