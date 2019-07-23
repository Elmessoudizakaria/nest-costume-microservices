import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';

describe('ApiService', () => {
    let service: ApiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [ApiService]
        }).compile();

        service = module.get<ApiService>(ApiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should return the exact service path', () => {
        const listTestPaths = [
            { given: '/api/client', expected: 'http://localhost:4000/client' },
            {
                given: '/api/contrat',
                expected: 'http://localhost:4001/contrat'
            },
            { given: '/api/bill', expected: 'http://localhost:4003/bill' },
            { given: '/api/wrongPath', expected: 'NOTHING' }
        ];
        listTestPaths.forEach(item => {
            expect(service.realPath(item.given)).toEqual(item.expected);
        });
    });
});
