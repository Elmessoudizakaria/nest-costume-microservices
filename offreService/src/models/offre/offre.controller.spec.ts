import { Test, TestingModule } from '@nestjs/testing';
import { OffreController } from './offre.controller';

describe('Offre Controller', () => {
  let controller: OffreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffreController],
    }).compile();

    controller = module.get<OffreController>(OffreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
