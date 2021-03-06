import 'dotenv/config';
import { CreateClientDto } from '../src/dto/client.dto';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { dbs } from '../../shared/config';
import { HttpStatus } from '@nestjs/common';

const app = 'http://localhost:4000';

describe('Client Controller', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_TEST_URI);
        await mongoose.connection.db.dropDatabase();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
    it('should be created', () => {
        const createClient: CreateClientDto = {
            adress: 'hay el houda',
            fassoc: 'SA',
            noSiret: 899898919,
            rSocial: 'toto test'
        };

        return request(app)
            .post('/client')
            .set('Accept', 'application/json')
            .send(createClient)
            .expect(({ body }) => {
                expect(body.noSiret).toEqual(createClient.noSiret);
                expect(body.fassoc).toEqual(createClient.fassoc);
            });
    });

    it('should reject duplicate', () => {
        const createClient: CreateClientDto = {
            adress: 'hay el houda',
            fassoc: 'SA',
            noSiret: 899898919,
            rSocial: 'toto test'
        };

        return request(app)
            .post('/client')
            .set('Accept', 'application/json')
            .send(createClient)
            .expect(({ body }) => {
                expect(body.status).toEqual(HttpStatus.BAD_REQUEST);
                expect(body.message).toEqual('DUPLICATE CLIENT SIRET');
            });
    });

    it('should return a list of clients', () => {
        return request(app)
            .get('/client')
            .expect(({ body }) => {
                expect(body.length).toEqual(1);
                expect(body[0].active).toBeTruthy();
            });
    });
});
