import * as mongoose from 'mongoose';

export const lignSchema = new mongoose.Schema({
    status:{type:String},
    offreId:{type:String},
    contratId:{type:String},
    dateFin:{type:Date, default:null}
})