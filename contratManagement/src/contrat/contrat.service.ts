import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contrat } from "./interfaces/contart.interface";
import { CreateContratDto } from "./dto/contart.dto";
import { ExternalApiService } from "./externals/externalApi";


@Injectable()
export class ContratService{
    constructor(@InjectModel('Contrat') private readonly contraModel:Model<Contrat>,private externalService:ExternalApiService){}

    async create(createContratDto:CreateContratDto){
        const createdContrat = new this.contraModel(createContratDto);
        return await createdContrat.save();
    }

    async findByClient(noSiret:number):Promise<Contrat[]>{
        return await this.contraModel.find({clientId:noSiret}).exec();
    }
    async findById(id:string){
        return await this.contraModel.findById(id).exec();
    }

    async testCascad(noSiret:number){
        let list = [];
        const contrats = await this.findByClient(noSiret);
        return new Promise((resolve,reject)=>{
            contrats.forEach(async (item)=>{
                const bills = await this.externalService.findBills(item._id); 
                const result={contrat:item,bills:bills.data}
                list.push(result);
            })
            setTimeout(() => {
                resolve(list)
            }, 350);
        });  
    }
}