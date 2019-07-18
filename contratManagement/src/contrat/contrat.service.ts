import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contrat } from "./interfaces/contart.interface";
import { CreateContratDto, ContratDetailDto } from "./dto/contart.dto";
import { ExternalApiService } from "./externals/externalApi";

@Injectable()
export class ContratService{
    constructor(@InjectModel('Contrat') private readonly contraModel:Model<Contrat>,private externalService:ExternalApiService){}

    async create(createContratDto:CreateContratDto){
        const createdContrat = new this.contraModel(createContratDto);
        return await createdContrat.save();
    }

    async findByClient(noSiret:number):Promise<Contrat[]>{
        return await this.contraModel.find({clientId:noSiret,isValid:true}).exec();
    }

    async findDetailsByClient(noSiret:number):Promise<ContratDetailDto[]>{
        let list:ContratDetailDto[] = [];
        const contrats = await this.contraModel.find({clientId:noSiret}).exec();
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

    async findById(id:string){
       try {
        return await this.contraModel.findById(id).exec();
       } catch (error) {
           return error;
       }
    }

    async updateLignsContrat(contrat:Contrat){
        try {
            return await this.contraModel.findOneAndUpdate({_id:contrat._id},contrat,{upsert:true})
        } catch (error) {
            return error;
        }
    }
    
    async turnOn(id:string){
        return await this.contraModel.findByIdAndUpdate(id,{isValid:true});
    }
    async turnOff(id:string){
        return await this.contraModel.findByIdAndUpdate(id,{isValid:false});
    }
}