import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Offre } from "./interfaces/offre.interface";
import { CreateOffreDto } from "./dto/offre.dto";


@Injectable()
export class OffreService{
    constructor(@InjectModel('Offre') private readonly offreModel:Model<Offre>){}

    async create(createOffreDto:CreateOffreDto){
        const createdOffre = new this.offreModel(createOffreDto);
        return await createdOffre.save();
    }

    async findOne(id:string){
        return await this.offreModel.findOne({_id:id,isActive:true}).exec();
    }

    async findAll(){
        return await this.offreModel.find().exec();
    }
}