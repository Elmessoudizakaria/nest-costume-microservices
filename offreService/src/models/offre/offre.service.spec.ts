import { Test, TestingModule } from '@nestjs/testing';
import { OffreService } from './offre.service';

describe('OffreService', () => {
  let service: OffreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffreService],
    }).compile();

    service = module.get<OffreService>(OffreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
