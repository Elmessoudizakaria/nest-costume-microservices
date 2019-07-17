import * as mongoose from 'mongoose';

export const billSchema = new mongoose.Schema({
    dateCreation:{type:Date,default:Date()},
    total:{type:Number},
    contratId:{type:String}
})