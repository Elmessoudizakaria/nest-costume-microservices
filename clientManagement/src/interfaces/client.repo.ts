import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './client.interface';

@Injectable()
export class ClientRepo {
    constructor(
        @InjectModel('Client') private readonly lignModel: Model<Client>
    ) {}

    async findByRsocial(name: string) {
        return await this.lignModel.findOne({ rSocial: name }).exec();
    }

    async findByNoSiret(noSiret: number) {
        return await this.lignModel.findOne({ noSiret: noSiret }).exec();
    }
}
