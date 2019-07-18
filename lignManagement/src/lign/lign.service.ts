import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lign } from "./interfaces/lign.interface";
import { ExternalService } from "./external/external.service";
import { CreateLignDto } from "./dto/lign.dto";


@Injectable()
export class LignService{
    constructor(@InjectModel('Lign') private readonly lignModel:Model<Lign>,private externalService:ExternalService ){}


    async create(createLignDto:CreateLignDto){
        const contrat = await this.externalService.checkoutContrat(createLignDto.contratId);
        if(contrat.data){
            let updatedContrat = contrat.data;
            const createdLign = new this.lignModel(createLignDto);
            const newLign = await createdLign.save();
            updatedContrat.waitingLigns.push(newLign._id);
            this.externalService.updateContrat(updatedContrat);
            return {success:true,msg:'ligns creatde success'}
        }else{
            return {success:false,msg:'somthing went wrong'}
        }
    }

    async updateStatus(id:string,status:string){
        const lign = await this.lignModel.findById(id);
        const contrat = await this.externalService.checkoutContrat(lign.contratId);
        const updatedContrat = contrat.data;
        switch (lign.status) {
            case 'activated':
                updatedContrat.activatedLigns = updatedContrat.activatedLigns.filter(e=> e!== id );
                break;
            case 'disabled':
                updatedContrat.disabedLigns = updatedContrat.disabedLigns.filter(e=> e!== id );
                break;
            case 'waiting':
                updatedContrat.waitingLigns = updatedContrat.waitingLigns.filter(e=> e!== id );
                break;
            default:
                break;
        }

        switch (status) {
            case 'activated':
                updatedContrat.activatedLigns.push(id);
                break;
            case 'disabled':
                updatedContrat.disabedLigns.push(id);
                break;
            default:
                break;
        }
        await this.externalService.updateContrat(updatedContrat);
        return await this.lignModel.findOneAndUpdate({_id:id},{status:status})
    }

    async findByContrat(contratId:string){
        return await this.lignModel.find({contratId:contratId}).exec();
    }
}