import * as mongoose from 'mongoose';

export const contratSchema = new mongoose.Schema({
    creationDate:{type:Date,default:Date()},
    actuelPrice:{type:Number},
    duration:{type:Number},
    observation:{type:String},
    contraType:{type:String},
    clientId:{type:Number},
    isValid:{type:Boolean,default:false},
    activatedLigns:{type:[String]},
    waitingLigns:{type:[String]},
    disabedLigns:{type:[String]},
})