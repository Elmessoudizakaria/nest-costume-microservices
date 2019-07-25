import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../interfaces/client.interface';
import {
    CreateClientDto,
    UpdateContratClientDto,
    FindClientDetailDto
} from '../../dto/client.dto';
import { ExternalService } from '../../externals/external.service';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel('Client') private clientModel: Model<Client>,
        private externalService: ExternalService
    ) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const client = await this.clientModel.findOne({
            noSiret: createClientDto.noSiret
        });
        if (!client) {
            const createdClient = new this.clientModel(createClientDto);
            return await createdClient.save();
        } else {
            throw new HttpException(
                'DUPLICATE CLIENT SIRET',
                HttpStatus.BAD_REQUEST
            );
        }
    }
    async findOne(siret: number): Promise<Client | string> {
        const client = await this.clientModel
            .findOne({ noSiret: siret })
            .exec();
        if (client) {
            const contrats = await this.externalService.getContrat(
                client.noSiret
            );
            if (contrats.data.length !== 0) {
                return client;
            } else {
                return 'Client Exist But Has No Valid Contrat';
            }
        } else {
            return 'Create A new Client';
        }
    }
    async findAll(): Promise<Client[]> {
        return await this.clientModel.find();
    }

    async trunOff(noSiret: number) {
        const filter = { noSiret: noSiret };
        const update = { active: false };
        return await this.clientModel.findOneAndUpdate(filter, update).exec();
    }

    async updateContracts(updateContratClientDto: UpdateContratClientDto) {
        const filter = { noSiret: updateContratClientDto.noSiret };
        const client = await this.clientModel.findOne(filter).exec();
        client.contracts.push(updateContratClientDto.idContrat);
        return await client.save();
    }

    async findClientBySiret(siret: number): Promise<Client> {
        const client = await this.clientModel
            .findOne({ noSiret: siret })
            .exec();
        return client;
    }

    async findClientDetailBySiret(siret: number): Promise<FindClientDetailDto> {
        const client = await this.findClientBySiret(siret);
        if (!client) {
            return { status: false, client: null, detail: null };
        } else {
            // recupere les contrat valid avec les lignes
            const contratEtLignes = await this.externalService.getContrat(
                client.noSiret
            );
            const contratandLignes = contratEtLignes.data;
            // filterd contract by active lignes
            const filtredContratByActiveLignes = contratandLignes
                .map(el => el)
                .filter(el => el.contrat.activatedLigns);
            //  bills in less than 2 months
            const bills = client.contracts.map(async contrat => {
                return await this.externalService.findBillsXMonth(contrat, 2);
            });
            return filtredContratByActiveLignes.length > 0 || bills.length > 0
                ? { status: true, client, detail: filtredContratByActiveLignes }
                : { status: false, client: null, detail: null };
        }
    }

    async findBillsByMonth(id: string, month: number) {
        return await this.externalService.findBillsXMonth(id, month);
    }
}
