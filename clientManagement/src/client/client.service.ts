import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './interfaces/client.interface';
import { CreateClientDto, UpdateContratClientDto } from './dto/client.dto';
import { ExternalService } from './externals/external.service';

@Injectable()
export class ClientService{
    constructor(@InjectModel('Client') private readonly clientModel:Model<Client>,private externalService:ExternalService){}

    async create(createClientDto:CreateClientDto):Promise<Client>{
        const createdClient = new this.clientModel(createClientDto);
        return await createdClient.save();
    }
    async findOne(siret:number):Promise<Client|string>{
        const client = await  this.clientModel.findOne({noSiret:siret}).exec();
        if(client){
            const contrats = await this.externalService.getContrat(client.noSiret);
            if(contrats.data.length!==0){
                return client;
            }else{
                return 'Client Exist But Has No Valid Contrat';
            }
        }else{
            return 'Create A new Client'
        }
        
    }
    async findAll():Promise<Client[]>{
        return await this.clientModel.find().exec();
    }
    
    async trunOff(noSiret:number){
        const filter={noSiret:noSiret};
        const update={active:false};
        return await this.clientModel.findOneAndUpdate(filter,update).exec();
    }

    async updateContracts(updateContratClientDto:UpdateContratClientDto){
        const filter={noSiret:updateContratClientDto.noSiret};
        const client = await this.clientModel.findOne(filter).exec();
        client.contracts.push(updateContratClientDto.idContrat);
        return await client.save();
    }

    async findBySiret(siret:number):Promise<string>{
        const client = await  this.clientModel.findOne({noSiret:siret}).exec();
        if(!client){
            return 'NEW'
        }else{
            const clientValidContrats = await this.externalService.getContrat(client.noSiret);
            if(clientValidContrats.data.length===0){
                return 'NEW'
            }else{
                for(let i=0;i<clientValidContrats.data.length;i++){
                    const contrat = clientValidContrats.data[i];
                    if(contrat.activatedLigns.length>0){
                        return 'PARC'
                    }
                }
                // bills conditions
                for(let j=0;j<client.contracts.length;j++){
                    const activeBills = await this.findBillsByMonth(client.contracts[j],2);
                    if(activeBills.data.length>0){
                        return 'PARC'
                    }else{
                        return 'NEW'
                    }
                }
                
            }
        }
        
    }

    async findBillsByMonth(id:string,month:number){
        return await this.externalService.findBillsXMonth(id,month);
    }
}