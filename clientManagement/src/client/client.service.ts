import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './interfaces/client.interface';
import { CreateClientDto, UpdateContratClientDto } from './dto/client.dto';

@Injectable()
export class ClientService{
    constructor(@InjectModel('Client') private readonly clientModel:Model<Client>){}

    async create(createClientDto:CreateClientDto):Promise<Client>{
        const createdClient = new this.clientModel(createClientDto);
        return await createdClient.save();
    }
    async findOne(siret:number):Promise<Client>{
        return await this.clientModel.findOne({noSiret:siret,active:true}).exec();
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
}