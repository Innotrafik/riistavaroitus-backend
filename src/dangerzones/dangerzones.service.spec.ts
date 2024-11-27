import { Test, TestingModule } from '@nestjs/testing';
import { DangerzonesService } from './dangerzones.service';

describe('DangerzonesService', () => {
  let service: DangerzonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DangerzonesService],
    }).compile();

    service = module.get<DangerzonesService>(DangerzonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
