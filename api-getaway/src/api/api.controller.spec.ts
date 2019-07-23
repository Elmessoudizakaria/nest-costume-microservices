import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';

describe('Api Controller', () => {
    let controller: ApiController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [ApiController],
            providers: [ApiService]
        }).compile();

        controller = module.get<ApiController>(ApiController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
