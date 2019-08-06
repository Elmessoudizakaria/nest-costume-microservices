import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../interfaces/client.interface';
import { CreateClientDto } from 'src/dto/client.dto';

@Injectable()
export class ClientRepository {
    constructor(
        @InjectModel('Client') private readonly lignModel: Model<Client>
    ) {}

    async findByRsocial(name: string) {
        return await this.lignModel.findOne({ rSocial: name }).exec();
    }

    async findByNoSiret(noSiret: number) {
        return await this.lignModel.findOne({ noSiret: noSiret }).exec();
    }
    async makeOne(client: CreateClientDto) {
        return await new this.lignModel(client).save();
    }
}
