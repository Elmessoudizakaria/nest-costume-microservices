import * as mongoose from 'mongoose';

export const clientSchema= new mongoose.Schema({
    rSocial: {type:String},
    noSiret: {type:Number,unique:true},
    adress: {type:String},
    fassoc: {type:String},
    active:{type:Boolean,default:true},
    contracts:{type:[String]}
})