import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { ExternalService } from '../externals/external.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/common';
import { CreateClientDto } from 'src/dto/client.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Client } from 'src/interfaces/client.interface';

describe('Client Service', () => {
    let service: ClientService;
    let clientModel = {
        rSocial: { type: String },
        noSiret: { type: Number, unique: true },
        adress: { type: String },
        fassoc: { type: String },
        active: { type: Boolean, default: true },
        contracts: { type: [String] },
        find: () => {
            return {};
        }
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [
                ClientService,
                {
                    provide: getModelToken('Client'),
                    useValue: clientModel
                },
                ExternalService
            ]
        }).compile();

        service = module.get<ClientService>(ClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a client', async () => {
        // GIVEN
        const expectedClient = {};
        // THEN
        const thenClient = await service.findAll();

        // EXPECTED
        expect(thenClient).toEqual(expectedClient);
    });
});
