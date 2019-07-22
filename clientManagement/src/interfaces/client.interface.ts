import * as mongoose from 'mongoose';


export interface Client extends mongoose.Document{
    readonly rSocial:string;
    readonly noSiret:number;
    readonly adress:string;
    readonly active:boolean;
    readonly fassoc:string;
    readonly contracts:string[];
}