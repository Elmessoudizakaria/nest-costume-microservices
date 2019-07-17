import * as mongoose from 'mongoose';

export const contratSchema = new mongoose.Schema({
    creationDate:{type:Date,default:Date()},
    actuelPrice:{type:Number},
    offre:{type:String},
    duration:{type:Number},
    observation:{type:String},
    contraType:{type:String},
    clientId:{type:Number},
    isValid:{type:Boolean,default:false}
})