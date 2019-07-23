import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../interfaces/client.interface';
import {
    CreateClientDto,
    UpdateContratClientDto,
    FindClientDetailDto
} from '../dto/client.dto';
import { ExternalService } from '../externals/external.service';

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

    async findBySiret(siret: number): Promise<FindClientDetailDto> {
        const client = await this.clientModel
            .findOne({ noSiret: siret })
            .exec();
        if (!client) {
            return { status: false, client: null, detail: null };
        } else {
            const contratEtLignes = await this.externalService.getContrat(
                client.noSiret
            );
            if (contratEtLignes.data.length === 0) {
                return { status: false, client: null, detail: null };
            } else {
                for (let i = 0; i < contratEtLignes.data.length; i++) {
                    const contrat = contratEtLignes.data[i].contrat;
                    if (contrat.activatedLigns.length > 0) {
                        return {
                            status: true,
                            client: client,
                            detail: contratEtLignes.data
                        };
                    }
                }
                // bills conditions
                for (let j = 0; j < client.contracts.length; j++) {
                    const activeBills = await this.findBillsByMonth(
                        client.contracts[j],
                        2
                    );
                    if (activeBills.data.length > 0) {
                        return {
                            status: true,
                            client: client,
                            detail: contratEtLignes.data
                        };
                    } else {
                        return { status: false, client: null, detail: null };
                    }
                }
            }
        }
    }

    async findBillsByMonth(id: string, month: number) {
        return await this.externalService.findBillsXMonth(id, month);
    }
}
