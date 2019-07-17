import * as mongoose from 'mongoose';

export const offreSchema = new mongoose.Schema({
    name:{type:String},
    monthlyPrice:{type:Number},
    fmsPrice:{type:String},
    options:{type:[String]},
    isActive:{type:Boolean, default:true}
})